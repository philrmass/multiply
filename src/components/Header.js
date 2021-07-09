import React from 'react';
import { connect } from 'react-redux';

import { getDateString } from '../utilities/time';
import { toggleStats } from '../redux/game/actions';

/* eslint-disable react/prop-types */
function Header({
  today,
  total,
  min,
  answered,
  toggleStats,
}) {
  const date = getDateString(today);

  const buildProgress = () => {
    const progress = `${answered} / ${total}`;
    const barColor = (answered >= min) ? 'bar-filled-1' : 'bar-filled-0';
    const percentage = Math.min(100 * answered / total, 100);
    const barStyle = { width: `${percentage}%` };

    return (
      <div className='progress-box'>
        <div className='progress'>
          <div className='bar'>
            <div className={barColor} style={barStyle}></div>
          </div>
          <div>{progress}</div>
        </div>
      </div>
    );
  };

  return (
    <div className='header'>
      <div>{date}</div>
      {buildProgress()}
      <div onClick={toggleStats}>Stats</div>
    </div>
  );
}

const mapState = (state) => ({
  today: state.game.today,
  total: state.game.total,
  min: state.game.min,
  answered: state.game.answered,
});

const mapDispatch = {
  toggleStats,
};
  
export default connect(mapState, mapDispatch)(Header);
