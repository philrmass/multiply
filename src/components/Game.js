import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import { stop, pickQuestion, repeatQuestion, answerQuestion } from '../redux/game/actions';

/* eslint-disable react/prop-types */
function Game({
  first,
  second,
  result,
  showResult,
  isCorrect,
  stop,
  pickQuestion,
  repeatQuestion,
  answerQuestion,
}) {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    const delayMs = 500;

    if (showResult) {
      if(isCorrect) {
        setTimeout(pickQuestion, delayMs);
      } else {
        setTimeout(repeatQuestion, delayMs);
      }
    } else {
      inputRef?.current?.focus();
    }
  }, [showResult, isCorrect]);

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
    const resultClass = isCorrect ? 'answer pass' : 'answer fail';

    if (showResult) {
      return (
        <input
          type='number'
          min='1'
          max='999'
          className={resultClass}
          value={result}
        />
      );
    }

    return (
      <input
        ref={inputRef}
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
  repeatQuestion,
  answerQuestion,
};

export default connect(mapState, mapDispatch)(Game);
