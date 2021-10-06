import React from 'react';

export default function Keyboard() {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Back', '0', 'Go'];

  const handleClick = (key) => {
    console.log('key', key);
  };
 
  return (
    <div className='keyboard'>
      {keys.map((key) => (
        <div
          key={key}
          className='key'
          onClick={() => handleClick(key)}
        >
          {key}
        </div>
      ))}
    </div>
  );
}
