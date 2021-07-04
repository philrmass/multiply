import React from 'react';
import { connect } from 'react-redux';

function Inactive() {
  return (
    <button>Start</button>
  );
}

const mapState = (state) => ({
});

export default connect(mapState)(Inactive);
