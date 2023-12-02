import React, { useRef, useId, memo, useCallback } from "react";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";

//Components & ReduxModules
import * as St from "../../styledComponents/Styledhome/StyledForm";
import { tabWithPayload } from "../../redux/modules/tabSlice";
import { __addPost } from "../../redux/modules/postsSlice";
import theme from "../../styledComponents/theme/theme";

function Form() {
  console.log("Form : Render");

  // Reducer
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const characters = theme.character;
  const auth = useSelector((state) => state.auth);

  //Component에 필요한 재료들
  const formRef = useRef({});
  const inputLabelTextId = useId();
  const selectLabelId = useId();

  // checkValidForm 함수 안에 들어가있음
  const addPostHandler = useCallback(() => {
    const date = new Date();
    const newPost = {
      nickname: auth.nickname,
      content: formRef.text.value,
      avatar: auth.avatar,
      writedTo: formRef.target.value,
      createdAt: date.toString(),
      userid: auth.userId,
    };

    dispatch(__addPost(newPost));
    formRef.text.value = "";
  }, [auth, dispatch]);

  // 유효성검사조금 하고 포스트 더해주자
  const checkValidForm = useCallback(() => {
    const text = formRef.text;
    if (text.value.trim() === "") return;

    addPostHandler();
  }, [addPostHandler]);

  return (
    <St.FormContainer>
      <St.Form>
        <St.InputContainer>
          <div style={{ fontSize: "16px" }}>
            어린분의 닉네임은 :{auth.nickname}
          </div>
        </St.InputContainer>
        <St.InputContainer>
          <St.InputLabel htmlFor={inputLabelTextId}>Letter</St.InputLabel>
          <St.Input
            ref={(ref) => (formRef["text"] = ref)}
            id={inputLabelTextId}
            as="textarea"
            maxLength={100}
            placeholder="100자만"
          />
        </St.InputContainer>
        <St.InputContainer>
          <St.InputLabel htmlFor={selectLabelId} $select>
            누구에게 보낼건가요??
          </St.InputLabel>
          <St.Input
            ref={(ref) => (formRef["target"] = ref)}
            as="select"
            id={selectLabelId}
            onChange={(e) => {
              dispatch(tabWithPayload(e.target.value));
            }}
          >
            {characters.map((item, i) => (
              <St.Input key={uuid()} as="option" value={item}>
                {item}
              </St.Input>
            ))}
          </St.Input>
        </St.InputContainer>
        <St.Button onClick={checkValidForm}>보내기</St.Button>
      </St.Form>
    </St.FormContainer>
  );
}

export default memo(Form);
