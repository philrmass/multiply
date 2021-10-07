import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import { stop, pickQuestion, repeatQuestion, answerQuestion } from '../redux/game/actions';

import Keyboard from './Keyboard';

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

  const handleClick = (key) => {
    const maxLen = 3;

    if (key === 'Go') {
      if (value) {
        answerQuestion(Number(value));
        setValue('');
      }
    } else if (key === 'Back') {
      setValue((value) => value.slice(0, -1));
    } else {
      setValue((value) => {
        if (value.length < maxLen) {
          return value + key;
        }
        return value;
      });
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
        readOnly={true}
        type='number'
        min='1'
        max='999'
        className='answer'
        value={value}
      />
    );
  };

  return (
    <div className='game' onKeyDown={(e) => console.log('key', e)}>
      <div className='gameSpacer'></div>
      <div className='gameContent'>
        <form className='problem'>
          <div className='question'>
            <div>{first}</div>
            <div>{`x ${second}`}</div>
          </div>
          {buildResult()} 
        </form>
        <Keyboard onClick={handleClick} />
      </div>
      <div className='stop'>
        <button onClick={stop}>Stop</button>
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
