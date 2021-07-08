import {
  ANSWER_QUESTION,
  INIT,
  PICK_QUESTION,
  REPEAT_QUESTION,
  START,
  STOP,
} from '../constants';
import {
  getAllQuestions,
  pickQuestion,
  createQuestion,
  parseQuestion,
  getHardQuestions,
} from '../../utilities/questions';
import { saveItem, loadItem } from '../../utilities/storage';

const todayKey = 'multiplyToday';
const questionsKey = 'multiplyQuestions';
const totalKey = 'multiplyTotal';
const defaultState = {
  today: loadItem(todayKey, 0),
  questions: loadItem(questionsKey, []),
  start: 0,
  first: 0,
  second: 0,
  result: 0,
  total: loadItem(totalKey, 0),
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
      const total = action.total;

      saveItem(todayKey, today);
      saveItem(questionsKey, questions);
      saveItem(totalKey, total);

      return {
        ...state,
        today,
        questions,
        total,
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
      const question = createQuestion(state.first, state.second);
      const questions = [...state.questions, question];
      saveItem(questionsKey, questions);

      return {
        ...state,
        questions,
        isActive: false,
      };
    }
    case PICK_QUESTION: {
      let allQuestions = state.questions;
      if (allQuestions.length === 0) {
        //??? implement hard questions from stats
        allQuestions = getHardQuestions(state.stats, 15);
      }

      const { question, questions } = pickQuestion(allQuestions);
      const { first, second } = parseQuestion(question);

      saveItem(questionsKey, questions);

      return {
        ...state,
        questions,
        start: Date.now(),
        first,
        second,
        showResult: false,
      };
    }
    case REPEAT_QUESTION: 
      return {
        ...state,
        showResult: false,
      };
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
