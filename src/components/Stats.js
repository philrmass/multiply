import React, { useState } from 'react';
import { connect } from 'react-redux';

/* eslint-disable react/prop-types */
function Stats({
  stats,
}) {
  const [byDay, setByDay] = useState(false);
  const [type, setType] = useState('averageTime');

  const setShown = (byDay, type) => {
    setByDay(byDay);
    setType(type);
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

    return Object.keys(types).map((type) => (
      <div
        className='stats-menu-item'
        key={`day-${type}`}
        onClick={() => setShown(true, type)}
      >
        {types[type]}
      </div>
    ));
  };

  const buildQuestionOptions = () => {
    const types = {
      'averageTime': 'Average Time',
      'missed': 'Missed %',
    };

    return Object.keys(types).map((type) => (
      <div
        className='stats-menu-item'
        key={`question-${type}`}
        onClick={() => setShown(false, type)}
      >
        {types[type]}
      </div>
    ));
  };

  const buildStats = () => {
    if (byDay) {
      return buildDayStats();
    }

    return (
      <div className='stats'>
        {JSON.stringify(stats.days)}
      </div>
    );
  };

  const buildDayStats = () => {
    console.log('type', type);
  };

  return (
    <>
      {buildMenu()}
      <div className='stats-container'>
        {buildStats()}
      </div>
      <div>{`${byDay}-${type}`}</div>
    </>
  );
}

const mapState = (state) => ({
  stats: state.game.stats,
});

export default connect(mapState)(Stats);
