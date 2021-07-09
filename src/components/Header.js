import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import confetti from 'canvas-confetti';

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

  useEffect(() => {
    if (answered === min) {
      smallCelebration();
    }
    if (answered === total) {
      stop();
      bigCelebration();
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
      {buildProgress()}
      <div onClick={toggleStats}>Stats</div>
    </div>
  );
}

function smallCelebration() {
  const green = getComputedStyle(document.documentElement).getPropertyValue('--green');
  const blue = getComputedStyle(document.documentElement).getPropertyValue('--blue');

  confetti({
    colors: [green, blue],
    gravity: 0.8,
    origin: { y: 0.8 },
    particleCount: 300,
    spread: 90,
    startVelocity: 60,
    ticks: 600,
  });
}

function bigCelebration() {
  const end = Date.now() + 6000;
  const half = 10;
  const full = 2 * half;
  let cycle = 0;

  (function frame() {
    const left = (cycle % full) === 0;
    const right = ((cycle + half) % full) === 0;
    const inc = Math.random() > 0.5 ? 1 : 0;
    cycle = cycle + inc;

    if (left) {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
    }
    if (right) {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
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
