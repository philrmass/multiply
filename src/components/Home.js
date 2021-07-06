import React from 'react';
import { connect } from 'react-redux';

import { start } from '../redux/game/actions';

/* eslint-disable react/prop-types */
function Home({
  start,
}) {
  return (
    <div className='home'>
      <button onClick={start}>Start</button>
    </div>
  );
}

const mapDispatch = {
  start,
};

export default connect(null, mapDispatch)(Home);
