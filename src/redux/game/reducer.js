import {
  ANSWER_QUESTION,
  INIT,
  PICK_QUESTION,
  START,
  STOP,
} from '../constants';
import { getAllQuestions, pickQuestion, parseQuestion } from '../../utilities/questions';

const todayKey = 'multiplyToday';
const questionsKey = 'multiplyQuestions';
const defaultState = {
  today: loadToday(),
  questions: loadQuestions(),
  start: 0,
  first: 0,
  second: 0,
  result: 0,
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
      //??? save and load total

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
    case STOP: {
      //??? save current question
      //saveQuestions(questions);

      return {
        ...state,
        isActive: false,
      };
    }
    case PICK_QUESTION: {
      const allQuestions = state.questions;
      //??? if empty, questions = getHardQuestions(stats, 15)

      const { question, questions } = pickQuestion(allQuestions);
      const { first, second } = parseQuestion(question);

      saveQuestions(questions);

      return {
        ...state,
        questions,
        start: Date.now(),
        first,
        second,
        showResult: false,
      };
    }
    case ANSWER_QUESTION: {
      const correct = state.first * state.second;
      const isCorrect = action.value === correct;
      const answered = state.answered + (isCorrect ? 1 : 0);

      if (isCorrect) {
        // ??? add time to stats, save stats
        const time = Date.now() - state.start;
        console.log(`answer(${time}) ${isCorrect}`);
      }

      return {
        ...state,
        result: action.value,
        answered,
        showResult: true,
        isCorrect,
      };
    }
    default:
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
