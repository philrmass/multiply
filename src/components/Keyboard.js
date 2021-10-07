import React from 'react';

/* eslint-disable react/prop-types */
export default function Keyboard({ onClick }) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Back', '0', 'Go'];

  return (
    <div className='keyboard'>
      {keys.map((key) => (
        <div
          key={key}
          className='key'
          onClick={() => onClick(key)}
        >
          {key}
        </div>
      ))}
    </div>
  );
}
