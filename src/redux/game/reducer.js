import {
  START,
} from '../constants';

const defaultState = {
  isActive: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case START: {
      return {
        ...state,
        isActive: true,
      };
    }
    default:
      return state;
  }
}
