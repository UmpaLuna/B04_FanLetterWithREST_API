import React, { useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  StDetailContainer,
  StEditButton,
} from "../styledComponents/StyledDetail";
import { Input } from "../styledComponents/StyledForm";
import { Comment as StDetail } from "../styledComponents/StyledLetterForm";

import {
  editComment,
  removeComment,
} from "../redux/modules/fanLetterDataReducer";
import { useDispatch, useSelector } from "react-redux";

function Detail() {
  const { member, id } = useParams();
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const editText = useRef();

  //Reducer
  const fanLetterData = useSelector((state) => state.fanLetterData);
  const dispatch = useDispatch();

  const target = fanLetterData.utility.filteringMember(
    fanLetterData,
    member,
    id
  );
  const onClickEditComment = useCallback(() => {
    setEdit(!edit);
  }, [edit]);
  const onClickUpdateComment = useCallback(() => {
    if (editText.current.defaultValue === editText.current.value)
      return alert("수정이 안되었는디용");
    dispatch(editComment({ editText, member, id }));

    setEdit(!edit);
  }, [dispatch, edit, id, member]);
  const onClickRemoveComment = useCallback(() => {
    dispatch(removeComment({ member, id }));
    navigate("/");
  }, [dispatch, member, id, navigate]);

  console.log("Detail :", "Render");
  return (
    <StDetailContainer>
      <StDetail.Div>
        <StDetail.Avatar />
      </StDetail.Div>

      <StDetail.Div>
        <StDetail.Div>
          <StDetail.Author>name : {target[0].name}</StDetail.Author>
          <StDetail.Date>{target[0].date}</StDetail.Date>
        </StDetail.Div>
        {!edit ? (
          <StDetail.Text $detail>내용 : {target[0].text}</StDetail.Text>
        ) : (
          <Input
            as="textarea"
            maxLength={100}
            defaultValue={target[0].text}
            ref={editText}
          />
        )}
        {!edit ? (
          <>
            <StEditButton.Edit onClick={onClickEditComment}>
              수정
            </StEditButton.Edit>
            <StEditButton.Remove onClick={onClickRemoveComment}>
              삭제
            </StEditButton.Remove>
          </>
        ) : (
          <StEditButton.Update onClick={onClickUpdateComment}>
            업뎃
          </StEditButton.Update>
        )}
      </StDetail.Div>
    </StDetailContainer>
  );
}

export default React.memo(Detail);
