import {
  INIT,
  START,
} from '../constants';
import { getAllQuestions/*, pickQuestion, parseQuestion*/ } from '../../utilities/questions';

const todayKey = 'multiplyToday';
const questionsKey = 'multiplyQuestions';
const defaultState = {
  today: loadToday(),
  questions: loadQuestions(),
  start: 0,
  first: 0,
  second: 0,
  answer: 0,
  total: 0,
  answered: 0,
  stats: {},
  isActive: false,
  showResult: false,
  isCorrect: false,
  showStats: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case INIT: {
      const today = action.today;
      const questions = getAllQuestions();

      saveToday(today);
      saveQuestions(questions);

      return {
        ...state,
        today,
        questions,
        total: action.total,
        answered: 0,
      };
    }
    case START: {
      return {
        ...state,
        isActive: true,
      };
    }
    //add more questions from stats if empty, getHardQuestions(stats, count)
    //const { question, questions } = pickQuestion(state.questions);
    //const { first, second } = parseQuestion(question);
    //saveQuestions(questions);
    //first,
    //second,
    //answer: 0,
    //showResult: false,
    default:
      //??? console.log('else', state.today, state.questions);
      return state;
  }
}

function saveToday(today) {
  localStorage.setItem(todayKey, today);
}

function loadToday() {
  const todayStr = localStorage.getItem(todayKey);
  return Number(todayStr);
}

function saveQuestions(questions) {
  localStorage.setItem(questionsKey, JSON.stringify(questions));
}

function loadQuestions() {
  const questionsStr = localStorage.getItem(questionsKey);
  try {
    return JSON.parse(questionsStr);
  } catch (err) {
    return [];
  }
}
