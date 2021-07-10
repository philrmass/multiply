import React, { useState } from 'react';
import { connect } from 'react-redux';

import { toggleStats } from '../redux/game/actions';

/* eslint-disable react/prop-types */
function Stats({
  stats,
  toggleStats,
}) {
  const [byDay, setByDay] = useState(false);
  const [type, setType] = useState('averageTime');

  const setShown = (byDay, type) => {
    setByDay(byDay);
    setType(type);
  };

  const buildMenu = () => (
    <div className='stats-menu'>
      <div className='stats-menu-options'>
        <div className='stats-menu-day'>
          {buildMenuDay()}
        </div>
        <div className='stats-menu-question'>
          {buildMenuQuestion()} 
        </div>
      </div>
      <button onClick={toggleStats}>Close</button>
    </div>
  );

  const buildMenuDay = () => {
    const types = {
      'averageTime': 'Average Time',
      'totalTime': 'Total Time',
      'answered': 'Answered',
      'missed': 'Missed',
    };

    return Object.keys(types).map((type) => (
      <div key={`day-${type}`} onClick={() => setShown(true, type)}>
        {types[type]}
      </div>
    ));
  };

  const buildMenuQuestion = () => {
    const types = {
      'averageTime': 'Average Time',
      'missed': 'Missed %',
    };

    return Object.keys(types).map((type) => (
      <div key={`question-${type}`} onClick={() => setShown(false, type)}>
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
    </>
  );
}

const mapState = (state) => ({
  stats: state.game.stats,
});

const mapDispatch = {
  toggleStats,
};

export default connect(mapState, mapDispatch)(Stats);
