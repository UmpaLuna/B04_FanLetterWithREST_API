// Ducks로 써주장
/**
 * 1. actionValue 나열하시오
 * 2. action 할 함수를 나열 하시오 <= actionCreator
 * 3. initialState를 정의 하시오
 * 4. reducer를 만드시오
 * 5. export default로 reducer 하시고 combineReducers에 넣어주시오
 */

// actionValue
const CHANGE_TAB_NUMBER = "tab/CHANGE_TAB_NUMBER";
const CHANGE_TAB_OF_VALUE = "tab/CHANGE_TAB_OF_VALUE";

// actionCreator
export const changeTabNumber = (payload) => {
  return {
    type: CHANGE_TAB_NUMBER,
    payload,
  };
};
export const handleTabWithPayload = (payload) => {
  return {
    type: CHANGE_TAB_OF_VALUE,
    payload,
  };
};

// initialStateValue
const initialValue = 0;

// Reducer
const tabReducer = (state = initialValue, action) => {
  switch (action.type) {
    case CHANGE_TAB_NUMBER:
      return action.payload;

    case CHANGE_TAB_OF_VALUE:
      return state;

    default:
      return state;
  }
};

export default tabReducer;
