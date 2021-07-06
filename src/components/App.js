import React from 'react';
import { connect } from 'react-redux';

import { useInterval } from '../utilities/hooks';
import { getCurrentDay } from '../utilities/time';

import Game from './Game';
import Header from './Header';
import Home from './Home';

/* eslint-disable react/prop-types */
function App({
  today,
  isActive,
}) {
  useInterval(() => {
    const currentDay = getCurrentDay();
    if (currentDay !== today) {
      console.log('TDY', today, currentDay);
    }
  }, 2000);

  const buildContent = () => {
    if (isActive) {
      return <Game />;
    }
    return <Home />;
  };

  return (
    <div className='content'>
      <Header />
      {buildContent()}
    </div>
  );
}

const mapState = (state) => ({
  today: state.game.today,
  isActive: state.game.isActive,
});

export default connect(mapState)(App);
