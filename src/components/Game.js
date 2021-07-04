import React from 'react';
import { connect } from 'react-redux';

function Game() {
  const onSubmit = (e) => {
    e.preventDefault();

    console.log('SUBMIT');
  };

  return (
    <>
      <div>Game</div>
      <form onSubmit={onSubmit}>
        <input type="number" value={999}/>
      </form>
    </>
  );
}

const mapState = (state) => ({
});

export default connect(mapState)(Game);
