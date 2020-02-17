import { combineReducers } from "redux";
import answers from "./answerReducer";

const rootReducer = combineReducers({
  answers
});

export default rootReducer;
