import React from 'react';
import { connect } from 'react-redux';

import { getCurrentDay } from '../utilities/time';
import { init, start, pickQuestion } from '../redux/game/actions';

/* eslint-disable react/prop-types */
function Home({
  init,
  start,
  pickQuestion,
}) {
  const reset = () => {
    init(getCurrentDay());
  };

  const startGame = () => {
    start();
    pickQuestion();
  };

  return (
    <>
      <div className='reset' onClick={reset}>RESET</div>
      <div className='home'>
        <button onClick={startGame}>Start</button>
      </div>
    </>
  );
}

const mapDispatch = {
  init,
  start,
  pickQuestion,
};

export default connect(null, mapDispatch)(Home);
