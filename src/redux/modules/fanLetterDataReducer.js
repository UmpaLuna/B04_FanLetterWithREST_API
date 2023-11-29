import uuid from "react-uuid";
// Ducks로 써주장
/**
 * 1. actionValue 나열하시오
 * 2. action 할 함수를 나열 하시오 <= actionCreator
 * 3. initialState를 정의 하시오
 * 4. reducer를 만드시오
 * 5. export default로 reducer 하시고 combineReducers에 넣어주시오
 */

// actionValue
const defaultPreNameActionValue = "fanletterDataReducer/";
// utility
const SET_INITIAL_VALUE = `${defaultPreNameActionValue}SET_INITIAL_VALUE`;
const SET_LOCALSTORAGE_DATA = `${defaultPreNameActionValue}SET_LOCALSTORAGE_DATA`;
const FIND_DATA_INDEX = `${defaultPreNameActionValue}FIND_DATA_INDEX`;

// EDIT
const UPDATE_LIST = `${defaultPreNameActionValue}UPDATE_LIST`;
const EDIT_COMMENT = `${defaultPreNameActionValue}EDIT_COMMENT`;
const REMOVE_COMMENT = `${defaultPreNameActionValue}REMOVE_COMMENT`;

//START - actionCreator

// utilityCreator
export const setInitialData = (payload) => {
  return {
    type: SET_INITIAL_VALUE,
    payload,
  };
};
export const findingDataIndex = (payload) => {
  return {
    type: FIND_DATA_INDEX,
    payload,
  };
};

export const setLocalStorageData = () => {
  return {
    type: SET_LOCALSTORAGE_DATA,
  };
};

// EditCreator
export const updateList = (payload) => {
  return {
    type: UPDATE_LIST,
    payload,
  };
};

export const editComment = (payload) => {
  return {
    type: EDIT_COMMENT,
    payload,
  };
};

export const removeComment = (payload) => {
  return {
    type: REMOVE_COMMENT,
    payload,
  };
};
//END - actionCreator

//initialStateValue
const initialValue = {
  value: {
    드래곤볼: [
      {
        id: uuid(),
        name: "강백호",
        text: "지구협찬은 받고 뿌시냐",
        target: "드래곤볼",
        date: "2023-11-19",
      },
      {
        id: uuid(),
        name: "주술회전짱",
        text: "자식보고 싸우라고 하는 손오공..., 고죠센세가 그나마 나은건가?",
        target: "드래곤볼",
        date: "2023-11-19",
      },
    ],
    천사소녀네티: [
      {
        id: uuid(),
        name: "현역 수녀입니다.",
        text: "수녀가 수녀가 아닐지도",
        target: "천사소녀네티",
        date: "2023-11-19",
      },
      {
        id: uuid(),
        name: "ang(ry)el",
        text: "먼데 자기가 믿는 신 이름을 파냐, 파렴치하게",
        target: "천사소녀네티",
        date: "6억5만년70154(신계달력)",
      },
    ],

    단비: [
      {
        id: uuid(),
        name: "이제 분노조절 잘해",
        text: "어렸을 때 엄마가 너보여주고 나서 내가 ADHD없어졌다 고맙다.",
        target: "단비",
        date: "2023-11-20",
      },
      {
        id: uuid(),
        name: "너희 엄마는...",
        text: "너가 우리엄마 만나봐야됨, 징짜 넌 갱생 될걸?",
        target: "단비",
        date: "2023-11-14",
      },
    ],
    디지몬: [
      {
        id: uuid(),
        name: "아구몬 보고싶냐?",
        text: "코딩 해보면 그 마음 안들걸??",
        target: "디지몬",
        date: "2023-11-01",
      },
      {
        id: uuid(),
        name: "일어나",
        text: "아구몬 보고싶다면서 코딩해야지...",
        target: "디지몬",
        date: "2001-01-01",
      },
    ],
  },
  utility: {
    findDataIndex(state, param) {
      return state.value[param.member].findIndex(
        (target) => target.id === param.id
      );
    },
    filteringMember(state, member, id) {
      return state.value[member].filter((target) => target.id === id);
    },
  },
};

// Reducer
const fanLetterData = (state = initialValue, action) => {
  switch (action.type) {
    // utility
    case SET_INITIAL_VALUE:
      return { ...state, value: { ...action.payload } };

    case SET_LOCALSTORAGE_DATA:
      return initialDataSetLocalStorage(state);

    //Edit
    case UPDATE_LIST:
      return updateLists(state, action.payload);

    case EDIT_COMMENT:
      return handleEditComment(state, action.payload);

    case REMOVE_COMMENT:
      return handleRemoveComment(state, action.payload);

    default:
      return state;
  }
};

function handleEditComment(state, payload) {
  const { editText, member, id } = payload;

  const targetIndex = state.utility.findDataIndex(state, { member, id });
  state.value[member][targetIndex].text = editText.current.value;
  updateLocalStorageData(state);
  return { ...state };
}

function handleRemoveComment(state, payload) {
  const targetIndex = state.utility.findDataIndex(state, payload);

  state.value[payload.member].splice(targetIndex, 1);

  if (!state.value[payload.member].length) {
    delete state.value[payload.member];
  }
  updateLocalStorageData(state);
  return { ...state };
}

function initialDataSetLocalStorage(state) {
  localStorage.setItem("Tooniverse", JSON.stringify(state.value));
  const getData = localStorage.getItem("Tooniverse");
  const parseData = JSON.parse(getData);
  const newState = { ...state, value: { ...parseData } };
  return newState;
}

function updateLists(state, payload) {
  const letter = {
    id: uuid(),
    name: payload.name.value,
    text: payload.text.value,
    date: new Date().toString(),
    target: payload.target.value,
  };

  state.value[payload.target.value].unshift(letter);
  updateLocalStorageData(state);
  payload.name.value = "";
  payload.text.value = "";
  return { ...state };
}

function updateLocalStorageData(state) {
  localStorage.setItem("Tooniverse", JSON.stringify(state.value));
}

export default fanLetterData;
