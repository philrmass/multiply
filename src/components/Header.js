import React from 'react';
import { connect } from 'react-redux';

import { getDateString } from '../utilities/time';

/* eslint-disable react/prop-types */
function Header({
  today,
  questions,
}) {
  const date = getDateString(today);
  const progress = `${0} / ${questions?.length}`;
  console.log('QUES', questions);

  return (
    <div className='header'>
      <div>{date}</div>
      <div>{progress}</div>
    </div>
  );
}

const mapState = (state) => ({
  today: state.game.today,
  questions: state.game.questions,
});

export default connect(mapState)(Header);
