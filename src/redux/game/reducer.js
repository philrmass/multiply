import {
  START,
} from '../constants';

//??? get today & questions from local storage
const defaultState = {
  today: 0,
  questions: [],
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
