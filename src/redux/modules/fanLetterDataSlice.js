import { createSlice, current } from "@reduxjs/toolkit";
import uuid from "react-uuid";
const initialState = {
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
};

const fanLetterData = createSlice({
  name: "fanLetterData",
  initialState,
  reducers: {
    handleEditComment: editComment,
    handleRemoveComment: removeComment,
    fetchDataSetLocalStorage: fetchDataFromLocalStorage,
    updateLists: updateList,
    setInitialData: (state, action) => {
      return { ...state, value: { ...action.payload } };
    },
  },
});

export const {
  handleEditComment,
  handleRemoveComment,
  fetchDataSetLocalStorage,
  updateLists,
  setInitialData,
} = fanLetterData.actions;
export default fanLetterData.reducer;

//그냥 바깥으로 빼줌
function editComment(state, { payload }) {
  const { editText, member, id } = payload;
  const mutableState = deepCopy(state);
  const targetIndex = findDataIndex(mutableState, { member, id });
  mutableState.value[member][targetIndex].text = editText.current.value;
  updateLocalStorageData(mutableState);
  return { ...mutableState };
}

function removeComment(state, { payload }) {
  const mutableState = deepCopy(current(state));

  const targetIndex = findDataIndex(mutableState, payload);

  mutableState.value[payload.member].splice(targetIndex, 1);

  if (!mutableState.value[payload.member].length) {
    delete mutableState.value[payload.member];
  }
  updateLocalStorageData(mutableState);
  return { ...mutableState };
}

function fetchDataFromLocalStorage(state) {
  localStorage.setItem("Tooniverse", JSON.stringify(state.value));
  const getData = localStorage.getItem("Tooniverse");
  const parseData = JSON.parse(getData);
  const newState = { ...state, value: { ...parseData } };
  return newState;
}

function updateList(state, { payload }) {
  const currentState = deepCopy(current(state));

  const letter = {
    id: uuid(),
    name: payload.name.value,
    text: payload.text.value,
    date: new Date().toString(),
    target: payload.target.value,
  };

  currentState.value[payload.target.value].unshift(letter);
  updateLocalStorageData(currentState);

  return { ...currentState };
}

function updateLocalStorageData(state) {
  localStorage.setItem("Tooniverse", JSON.stringify(state.value));
}

//utility
function findDataIndex(state, { member, id }) {
  console.log(state.value[member]);
  return state.value[member].findIndex((target) => target.id === id);
}

function deepCopy(target) {
  if (typeof target === "object" && !Array.isArray(target)) {
    const copy = {};
    for (let key in target) {
      copy[key] = target[key];
      if (typeof copy[key] === "object") {
        copy[key] = deepCopy(target[key]);
      }
    }
    return copy;
  } else if (Array.isArray(target)) {
    const copyArr = [];

    target.forEach((el) => {
      if (typeof el === "object") {
        return copyArr.push(deepCopy(el));
      }
      copyArr.push(el);
    });
    return copyArr;
  } else {
    return target;
  }
}
