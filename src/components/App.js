import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useInterval } from '../utilities/hooks';
import { getCurrentDay } from '../utilities/time';
import { init } from '../redux/game/actions';

import Game from './Game';
import Header from './Header';
import Home from './Home';
import Stats from './Stats';

/* eslint-disable react/prop-types */
function App({
  today,
  isActive,
  showStats,
  init,
}) {
  const version = '0.0.4';

  const checkDay = () => {
    const currentDay = getCurrentDay();
    if (currentDay !== today) {
      init(currentDay);
    }
  };

  useInterval(checkDay, 60000);
  useEffect(checkDay, [today]);

  const buildContent = () => {
    if (isActive) {
      return <Game />;
    }

    if (showStats) {
      return <Stats />;
    }

    return <Home />;
  };

  return (
    <div className='content'>
      <Header />
      {buildContent()}
      <div className='version'>{version}</div>
    </div>
  );
}

const mapState = (state) => ({
  today: state.game.today,
  isActive: state.game.isActive,
  showStats: state.game.showStats,
});

const mapDispatch = {
  init,
};

export default connect(mapState, mapDispatch)(App);
