import React from 'react';
import { connect } from 'react-redux';

import Game from './Game';
import Inactive from './Inactive';

function App({ isActive }) {
  if (isActive) {
    return <Game />;
  }

  return <Inactive />;
}

const mapState = (state) => ({
  isActive: state.game.isActive,
});

export default connect(mapState)(App);
