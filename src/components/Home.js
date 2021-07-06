import React from 'react';
import { connect } from 'react-redux';

import { start } from '../redux/game/actions';

/* eslint-disable react/prop-types */
function Home({
  start,
}) {
  const startGame = () => {
    start();
    //pickQuestion();
  };

  return (
    <div className='home'>
      <button onClick={startGame}>Start</button>
    </div>
  );
}

const mapDispatch = {
  start,
};

export default connect(null, mapDispatch)(Home);
