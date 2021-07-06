import React, { useState } from 'react';
import { connect } from 'react-redux';

/* eslint-disable react/prop-types */
function Game() {
  const [answer, setAnswer] = useState('');

  const onInput = (e) => {
    setAnswer(e.target.value);
    console.log('INPUT', e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log('SUBMIT', answer);
  };

  return (
    <>
      <div>Game</div>
      <form onSubmit={onSubmit}>
        <input
          type='number'
          value={answer}
          onInput={onInput}
        />
      </form>
    </>
  );
}

const mapState = () => ({
});

export default connect(mapState)(Game);
