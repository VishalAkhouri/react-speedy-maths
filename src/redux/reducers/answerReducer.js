const initialState = {
  answers: []
};

export default function answerReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_ANSWERED":
      // TODO need to update this so that only the exact answer gets updated if exists otherwise answer needs to be added
      // return { ...state, ...action.answer };
      const assignedAnswers = [...state.answers, action.answer];
      return Object.assign({}, state, {
        answers: assignedAnswers
      });

    case "RESET_ANSWERED":
      return Object.assign({}, state, {
        answers: []
      });

    default:
      return state;
  }
}
