import React from 'react';
import { connect } from 'react-redux';

import { start, pickQuestion } from '../redux/game/actions';

/* eslint-disable react/prop-types */
function Home({
  start,
  pickQuestion,
}) {
  const startGame = () => {
    start();
    pickQuestion();
  };

  return (
    <div className='home'>
      <button onClick={startGame}>Start</button>
    </div>
  );
}

const mapDispatch = {
  start,
  pickQuestion,
};

export default connect(null, mapDispatch)(Home);
