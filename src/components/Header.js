import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { confetti75, confetti90, confetti105, confetti120, confetti135, confetti150 } from '../utilities/confetti';
import { getDateString } from '../utilities/time';
import { stop, toggleStats } from '../redux/game/actions';

/* eslint-disable react/prop-types */
function Header({
  today,
  total,
  min,
  answered,
  stop,
  toggleStats,
}) {
  const date = getDateString(today);
  const version = '0.0.1';

  useEffect(() => {
    if (answered === min) {
      confetti75();
    } else if (answered === 90) {
      confetti90();
    } else if (answered === 105) {
      confetti105();
    } else if (answered === 120) {
      confetti120();
    } else if (answered === 135) {
      confetti135();
    } else if (answered === total) {
      stop();
      confetti150();
    }
  }, [total, min, answered]);

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
      <div className='version'>{version}</div>
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
  stop,
  toggleStats,
};
  
export default connect(mapState, mapDispatch)(Header);
