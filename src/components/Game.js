import React, { useState } from 'react';
import { connect } from 'react-redux';

import { stop, pickQuestion, answerQuestion } from '../redux/game/actions';

/* eslint-disable react/prop-types */
function Game({
  first,
  second,
  result,
  showResult,
  isCorrect,
  stop,
  //pickQuestion,
  //repeatQuestion,
  answerQuestion,
}) {
  const [value, setValue] = useState('');

  //??? useEffect [showResult, isCorrect]
  // if showResult && isCorrect, pickQuestion() after timeout
  // if showResult && !isCorrect, repeatQuestion() after timeout

  const onInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (value) {
      answerQuestion(Number(value));
      setValue('');
    }
  };

  const buildResult = () => {
    //??? if showResult, set fixed 'input' with result and color
    console.log(` show(${showResult}) res(${result}) corr(${isCorrect})`);

    return (
      <input
        type='number'
        min='1'
        max='999'
        className='answer'
        value={value}
        onInput={onInput}
      />
    );
  };

  return (
    <div className='game'>
      <div className='stop'>
        <button onClick={stop}>Stop</button>
      </div>
      <div className='gameContent'>
        <form
          className='problem'
          onSubmit={onSubmit}
        >
          <div className='question'>
            <div>{first}</div>
            <div>{`x ${second}`}</div>
          </div>
          {buildResult()} 
        </form>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  first: state.game.first,
  second: state.game.second,
  result: state.game.result,
  showResult: state.game.showResult,
  isCorrect: state.game.isCorrect,
});

const mapDispatch = {
  stop,
  pickQuestion,
  answerQuestion,
};

export default connect(mapState, mapDispatch)(Game);
