import { createStore } from "redux";
import { combineReducers } from "redux";
import tabReducer from "../modules/tabReducer";
import fanLetterData from "../modules/fanLetterDataReducer";
const rootReducer = combineReducers({
  tabReducer,
  fanLetterData,
});
const store = createStore(rootReducer);

export default store;
