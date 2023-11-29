# 1. rendering 최적화의 관하여...

## useMemo, React.memo, useCallBack은 Redux branch에 결과적으로 다 써놓았습니다.

- src/pages의 Home.jsx, Detail.jsx
- src/Components의 Footer.jsx, Form.jsx, Header.jsx, Layout.jsx, LetterList.jsx, NavigateBar.jsx
  각 컴포넌트에 써놓았지만 제가 잘 작성한지 사실 '감'? 이 잘 안잡힙니다...
  그러나 무작정 감이 안잡힌다라기 보단,
  각 컴포넌트에 써놓았지만 제가 잘 작성한지 사실 '감'? 이 잘 안잡힙니다...
  그러나 무작정 감이 안잡힌다라기 보단,

Component, function, Calculate Value의 값을 혼자서 구별하고 그의 걸 맞는 dependency 배열의 value들을 써놓아 봤습니다.

---

# 2. Router- useNavigate의 re rendering - 해결? 하였습니다.

```javascript

// 상위 컴포넌트
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={`detail/:member/:id`} element={<Detail />} />
      <Route path="*" element={<h1>404 찾을수 없으셈</h1>} />
    </Routes>
  </Layout>

--------------------
// 하위 컴포넌트
 Home.jsx

 <NavigateBar />
 <Form />
 <LetterList />
```

useNavigate를 이용하여 route 되는 곳이 생기면

useNavigate가 이를 추적하여 페이지가 바뀌었다고 인식하여,

useNavigate를 사용한 각 컴포넌트에서 리렌더링이 일어난다라고 공부하였습니다.

그리하여 불필요한 리렌더링을 없애기 위해

Link tag를 사용하여 단지 특정 컴포넌트로의 페이지 이동(re-rendering)만 하게끔

src/components/Header.jsx 에 사용하여 문제 해결 하였습니다.

제가 공부한 개념이 맞는지 feedback... 감사하겠습니다.

---

# 2. Reducer에 관하여

src/redux/modules/fanLetterData.js에서
src/redux/modules/fanLetterData.js에서

reducer 함수를 만들었고 그 안에 switch 문으로 처리 하는 logic을 짰습니다.

```javascript
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
// Reducer의 case 문안에 있는 새로운 state반환하는 함수들
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
```

이렇게 reducer안에서 처리할 로직을 함수로 빼놓고 함수를 호출 하는 형식으로 하는 것이 가능한지 코드리뷰 부탁드려도 될까요....??
이렇게 reducer안에서 처리할 로직을 함수로 빼놓고 함수를 호출 하는 형식으로 하는 것이 가능한지 코드리뷰 부탁드려도 될까요....??
