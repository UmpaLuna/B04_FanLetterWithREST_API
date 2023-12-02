import React, { useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  StDetailContainer,
  StEditButton,
} from "../styledComponents/StyledDetail";
import { Input } from "../styledComponents/Styledhome/StyledForm";
import { Comment as StDetail } from "../styledComponents/Styledhome/StyledLetterForm";

import {
  __editPost,
  __deletePost,
  __getPosts,
} from "../redux/modules/postsSlice";

import { useDispatch, useSelector } from "react-redux";

function Detail() {
  const { id, member } = useParams();
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const editText = useRef();

  //Reducer
  const data = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const target = data.posts.filter((el) => {
    return el.id === parseInt(id);
  });
  console.log(target);
  const onClickEditComment = useCallback(() => {
    setEdit(!edit);
  }, [edit]);
  const onClickUpdateComment = useCallback(() => {
    if (editText.current.defaultValue === editText.current.value)
      return alert("수정이 안되었는디용");

    dispatch(__editPost({ editPost: editText.current.value, id }));

    setEdit(!edit);
  }, [dispatch, edit, id]);
  const onClickRemoveComment = useCallback(() => {
    dispatch(__deletePost(id));
    dispatch(__getPosts());
    navigate("/");
  }, [dispatch, navigate]);

  console.log("Detail :", "Render");
  return (
    <StDetailContainer>
      <StDetail.Div>
        <StDetail.Avatar />
      </StDetail.Div>

      <StDetail.Div>
        <StDetail.Div>
          <StDetail.Author>From : {target[0].userid}</StDetail.Author>
          <StDetail.Author> To : {target[0].writedTo}</StDetail.Author>
          <StDetail.Date>{target[0].createdAt}</StDetail.Date>
        </StDetail.Div>
        {!edit ? (
          <StDetail.Text $detail>내용 : {target[0].content}</StDetail.Text>
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
