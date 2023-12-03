import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  StDetailContainer,
  StEditButton,
} from "../styledComponents/StyledDetail";
import { Input, TextArea } from "../styledComponents/Styledhome/StyledForm";
import { Comment as StDetail } from "../styledComponents/Styledhome/StyledLetterForm";

import {
  __editPost,
  __deletePost,
  __getPosts,
} from "../redux/modules/postsSlice";

import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/modules/authSlice";
import { getAccessTokenFromLocalStorage } from "../API/localStorageApi";

function Detail() {
  // router
  const { id } = useParams();
  const navigate = useNavigate();
  //Reducer
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const currentId = getAccessTokenFromLocalStorage().userId;
  const target = data.posts.filter((el) => {
    return el.id === parseInt(id);
  });
  console.log("Detail :", "Render");
  const [edit, setEdit] = useState(true);
  const editText = useRef();

  useEffect(() => {
    if (data.error.isError) {
      dispatch(signOut());
      dispatch(__getPosts());
      navigate("/login");
    }
  }, [data, navigate, dispatch]);
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

        {target[0].userid === currentId && (
          <EditTextButton target={target} editText={editText} id={id} />
        )}
      </StDetail.Div>
    </StDetailContainer>
  );
}

export default React.memo(Detail);

const EditTextButton = ({ target, editText, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const onClickEditComment = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit]);
  const onClickRemoveComment = useCallback(() => {
    dispatch(__deletePost(id));
    dispatch(__getPosts());
    navigate("/home");
  }, [dispatch, navigate, id]);
  const onClickUpdateComment = useCallback(() => {
    if (editText.current.defaultValue === editText.current.value)
      return alert("수정이 안되었는디용");
    dispatch(__editPost({ editPost: editText.current.value, id }));
    setIsEdit(!isEdit);
  }, [dispatch, isEdit, id]);
  return (
    <>
      <textarea
        style={{
          width: "100%",
          padding: "10px",
          height: "120px",
          resize: "none",
          backgroundColor: `${isEdit ? "#00aeef" : "#fff"}`,
        }}
        defaultValue={target[0].content}
        ref={editText}
        readOnly={!isEdit}
      />
      {!isEdit ? (
        <>
          <StEditButton.Edit onClick={onClickEditComment}>
            수정하기
          </StEditButton.Edit>
          <StEditButton.Remove onClick={onClickRemoveComment}>
            삭제
          </StEditButton.Remove>
          :
        </>
      ) : (
        <StEditButton.Update onClick={onClickUpdateComment}>
          업뎃
        </StEditButton.Update>
      )}
    </>
  );
};
