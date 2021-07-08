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

const answeredKey = 'multiplyAnswered';
const questionsKey = 'multiplyQuestions';
const statsKey = 'multiplyStats';
const todayKey = 'multiplyToday';
const totalKey = 'multiplyTotal';

const defaultState = {
  today: loadItem(todayKey, 0),
  questions: loadItem(questionsKey, []),
  start: 0,
  first: 0,
  second: 0,
  result: 0,
  total: loadItem(totalKey, 0),
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
      const total = action.total;

      saveItem(answeredKey, answered);
      saveItem(questionsKey, questions);
      saveItem(todayKey, today);
      saveItem(totalKey, total);

      return {
        ...state,
        today,
        questions,
        total,
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
        missed: 0,
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
      const missed = state.missed + (isCorrect ? 0 : 1);
      const stats = state.stats;

      if (isCorrect) {
        // ??? put days int stats, answered, missed, total, all times
        // ??? add time & missed to stats, save stats
        const time = Date.now() - state.start;
        console.log(`answer(${time}) ${isCorrect}`);
        //??? if done, do confetti in Game
      }

      saveItem(answeredKey, answered);
      saveItem(statsKey, stats);

      return {
        ...state,
        result: action.value,
        answered,
        missed,
        stats,
        showResult: true,
        isCorrect,
      };
    }
    default:
      return state;
  }
}
