import React, { useRef, useId, memo, useCallback } from "react";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";

//Components & ReduxModules
import * as St from "../styledComponents/StyledForm";
import { handleTabWithPayload } from "../redux/modules/tabReducer";
import { updateList } from "../redux/modules/fanLetterDataReducer";
import theme from "../styledComponents/theme/theme";

function Form() {
  console.log("Form : Render");

  // Reducer
  const dispatch = useDispatch();
  const fanLetterData = useSelector((state) => state.fanLetterData);
  const characters = theme.character;

  //Component
  const formRef = useRef({});

  const inputLabelNameId = useId();
  const inputLabelTextId = useId();
  const selectLabelId = useId();

  const setFanLetterData = useCallback(() => {
    if (fanLetterData.value[formRef.target.value] === undefined) {
      fanLetterData.value[formRef.target.value] = [];
    }

    dispatch(updateList(formRef));
  }, [fanLetterData.value, dispatch]);

  const checkValidForm = useCallback(() => {
    const name = formRef.name;
    const text = formRef.text;

    if (name.value.trim() === "") return;
    if (text.value.trim() === "") return;

    setFanLetterData();
  }, [setFanLetterData]);

  return (
    <St.FormContainer>
      <St.Form>
        <St.InputContainer>
          <St.InputLabel htmlFor={inputLabelNameId}>nickName</St.InputLabel>
          <St.Input
            ref={(ref) => {
              formRef["name"] = ref;
            }}
            id={inputLabelNameId}
            placeholder="20자만"
          />
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
              dispatch(handleTabWithPayload(e));
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
