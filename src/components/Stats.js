import React, { useState } from 'react';
import { connect } from 'react-redux';

import { saveData, loadData, copyData } from '../utilities/files';
import { parseQuestion } from '../utilities/questions';
import { getAverageTime, getTotalTime, getWrongPercent } from '../utilities/stats';
import { getDateString, getSecondsString, getMinutesString } from '../utilities/time';
import { setStats } from '../redux/game/actions';

/* eslint-disable react/prop-types */
function Stats({
  stats,
  setStats,
}) {
  const [byDay, setByDay] = useState(true);
  const [type, setType] = useState('averageTime');
  const [status, setStatus] = useState('');

  const setShown = (byDay, type) => {
    setByDay(byDay);
    setType(type);
  };

  const save = async () => {
    const filePath = getFilePath();

    await saveData(filePath, stats);
    setStatus(`Saved ${getDataSummary(stats)} to ${filePath}`);
    setTimeout(() => setStatus(''), 5000);
  };

  const load = async () => {
    const data = await loadData();

    setStats(data);
    setStatus(`Loaded ${getDataSummary(data)}`);
    setTimeout(() => setStatus(''), 5000);
  };

  const copy = async () => {
    await copyData(stats);

    setStatus(`Copied ${getDataSummary(stats)} to clipboard`);
    setTimeout(() => setStatus(''), 5000);
  };

  const getFilePath = (at = Date.now()) => {
    const when = new Date(at);
    const year = when.getFullYear();
    const month = `${when.getMonth() + 1}`.padStart(2, '0');
    const date = `${when.getDate()}`.padStart(2, '0');

    return `multiplyStats_${year}_${month}_${date}.json`;
  };

  const getDataSummary = (stats) => {
    const days = Object.values(stats.days).length;
    const questions = Object.values(stats.questions).length;

    return `${days} days and ${questions} questions`;
  };

  const buildMenu = () => (
    <div className='stats-menu'>
      <div>
        <div className='stats-menu-row'>
          <div className='stats-menu-label'>By Day</div>
          {buildDayOptions()}
        </div>
        <div className='stats-menu-row'>
          <div className='stats-menu-label'>By Question</div>
          {buildQuestionOptions()} 
        </div>
        <div className='stats-menu-buttons'>
          <div className='stats-menu-status'>{status}</div>
          <div>
            <button className='stats-menu-button' onClick={save}>Save</button>
            <button className='stats-menu-button' onClick={load}>Load</button>
            <button className='stats-menu-button' onClick={copy}>Copy</button>
          </div>
        </div>
      </div>
    </div>
  );

  const buildDayOptions = () => {
    const types = {
      'averageTime': 'Average Time',
      'totalTime': 'Total Time',
      'answered': 'Answered',
      'missed': 'Missed',
    };

    return Object.keys(types).map((itemType) => {
      const isSelected = byDay && itemType === type;
      const classes = `stats-menu-item ${isSelected ? 'stats-selected' : ''}`;

      return (
        <div
          className={classes}
          key={`day-${itemType}`}
          onClick={() => setShown(true, itemType)}
        >
          {types[itemType]}
        </div>
      );
    });
  };

  const buildQuestionOptions = () => {
    const types = {
      'averageTime': 'Average Time',
      'missed': 'Missed %',
    };

    return Object.keys(types).map((itemType) => {
      const isSelected = !byDay && itemType === type;
      const classes = `stats-menu-item ${isSelected ? 'stats-selected' : ''}`;

      return (
        <div
          className={classes}
          key={`question-${itemType}`}
          onClick={() => setShown(false, itemType)}
        >
          {types[itemType]}
        </div>
      );
    });
  };

  const buildStats = () => {
    if (byDay) {
      return buildDayStats();
    }

    return buildQuestionStats();
  };

  const buildDayStats = () => {
    const days = Object.values(stats.days).reverse();
    const dates = days.map((day) => getDateString(day.today));
    const values = days.map((day) => getDayValue(day));
    const max = Math.max(...values);

    const dateRows = dates.map((date) => <div key={date} className='stats-key'>{date}</div>);
    const graphRows = values.map((value, index) => buildGraph(value, max, index));
    const valueRows = values.map((value, index) => <div key={`${index}-${value}`} className='stats-value'>{getDayStr(value)}</div>);

    return (
      <div className='stats'>
        <div className='stats-keys'>
          {dateRows}
        </div>
        <div className='stats-graphs'>
          {graphRows}
        </div>
        <div className='stats-values'>
          {valueRows}
        </div>
      </div>
    );
  };

  const getDayValue = (day) => {
    switch (type) {
      case 'averageTime':
        return getAverageTime(day);
      case 'totalTime':
        return getTotalTime(day);
      case 'answered':
        return day.times.length;
      case 'missed':
        return day.wrongs.reduce((sum, w) => sum + w, 0);
      default:
        return day.today;
    }
  };

  const getDayStr = (value) => {
    switch (type) {
      case 'averageTime':
        return getSecondsString(value); 
      case 'totalTime':
        return getMinutesString(value); 
      default:
        return `${value}`;
    }
  };

  const buildQuestionStats = () => {
    const questions = Object.values(stats.questions) ?? [];
    const items = questions.map((question) => getQuetionItem(question));
    const sorted = sortQuestionItems(items); 

    const keys = sorted.map((item) => {
      const { first, second } = parseQuestion(item.question);
      return `${first} x ${second}`;
    });
    const values = sorted.map((item) => getQuestionValue(item));
    const max = Math.max(...values);

    const keyRows = keys.map((key) => <div key={key} className='stats-key'>{key}</div>);
    const graphRows = values.map((value, index) => buildGraph(value, max, index));
    const valueRows = values.map((value, index) => <div key={`${index}-${value}`} className='stats-value'>{getQuestionStr(value)}</div>);

    return (
      <div className='stats'>
        <div className='stats-keys'>
          {keyRows}
        </div>
        <div className='stats-graphs'>
          {graphRows}
        </div>
        <div className='stats-values'>
          {valueRows}
        </div>
      </div>
    );
  };

  const getQuetionItem = (question) => {
    const average = getAverageTime(question);
    const percentage = getWrongPercent(question);

    return {
      question: question.question,
      average,
      percentage,
    };
  };

  const sortQuestionItems = (items) => {
    const byAverage = (a, b) => b.average - a.average;
    const byPercentage = (a, b) => b.percentage - a.percentage;
    const by = type === 'averageTime' ? byAverage : byPercentage;

    return items.sort(by);
  };

  const getQuestionValue = (item) => {
    switch (type) {
      case 'averageTime':
        return item.average;
      default:
        return item.percentage;
    }
  };

  const getQuestionStr = (value) => {
    switch (type) {
      case 'averageTime':
        return getSecondsString(value); 
      case 'missed':
      default:
        return `${value.toFixed(1)} %`;
    }
  };

  const buildGraph = (value, max, index) => {
    const percentage = Math.min(100 * value / max, 100);
    const barStyle = { width: `${percentage}%` };

    return (
      <div key={`${index}-${value}`} className='stats-graph'>
        <div className='stats-graph-bar' style={barStyle}>
        </div>
      </div>
    );
  };

  return (
    <>
      {buildMenu()}
      <div className='stats-container'>
        {buildStats()}
      </div>
    </>
  );
}

const mapState = (state) => ({
  stats: state.game.stats,
});

const mapDispatch = {
  setStats,
};

export default connect(mapState, mapDispatch)(Stats);
