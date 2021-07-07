import React from 'react';
import { connect } from 'react-redux';

import { getDateString } from '../utilities/time';

/* eslint-disable react/prop-types */
function Header({
  today,
  total,
  answered,
}) {
  const date = getDateString(today);
  const progress = `${answered} / ${total}`;

  return (
    <div className='header'>
      <div>{date}</div>
      <div>{progress}</div>
      <div>Stats</div>
    </div>
  );
}

const mapState = (state) => ({
  today: state.game.today,
  total: state.game.total,
  answered: state.game.answered,
});

export default connect(mapState)(Header);
