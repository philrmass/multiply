import {
  ANSWER_QUESTION,
  INIT,
  PICK_QUESTION,
  REPEAT_QUESTION,
  START,
  STOP,
  TOGGLE_STATS,
  SET_STATS,
} from '../constants';
import {
  getAllQuestions,
  pickQuestion,
  createQuestion,
  parseQuestion,
  getHardQuestions,
} from '../../utilities/questions';
import { resetDay, addAnswer } from '../../utilities/stats';
import { saveItem, loadItem } from '../../utilities/storage';

const answeredKey = 'multiplyAnswered';
const questionsKey = 'multiplyQuestions';
const statsKey = 'multiplyStats';
const todayKey = 'multiplyToday';

const defaultState = {
  today: loadItem(todayKey, 0),
  questions: loadItem(questionsKey, []),
  start: 0,
  first: 0,
  second: 0,
  result: 0,
  total: 150,
  min: 75,
  answered: loadItem(answeredKey, 0),
  stats: loadItem(statsKey, {}),
  isActive: false,
  showResult: false,
  isCorrect: false,
  showStats: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case INIT: {
      const answered = 0;
      const questions = getAllQuestions();
      const today = action.today;
      const params = {
        today,
        total: state.total,
        min: state.min,
      };
      const stats = resetDay(state.stats, params);

      saveItem(answeredKey, answered);
      saveItem(questionsKey, questions);
      saveItem(todayKey, today);
      saveItem(statsKey, stats);

      return {
        ...state,
        today,
        questions,
        answered,
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
        wrong: 0,
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
      const wrong = state.wrong + (isCorrect ? 0 : 1);
      let stats = state.stats;

      if (isCorrect) {
        const time = Date.now() - state.start;
        const params = {
          today: state.today, 
          total: state.total,
          min: state.min,
          question: createQuestion(state.first, state.second),
          time,
          wrong,
        };
        stats = addAnswer(stats, params);
      }

      saveItem(answeredKey, answered);
      saveItem(statsKey, stats);

      return {
        ...state,
        result: action.value,
        answered,
        wrong,
        stats,
        showResult: true,
        isCorrect,
      };
    }
    case TOGGLE_STATS:
      return {
        ...state,
        showStats: !state.showStats,
      };
    case SET_STATS: {
      const stats = { ...action.stats };

      saveItem(statsKey, stats);

      return {
        ...state,
        stats,
      };
    }
    default:
      return state;
  }
}
