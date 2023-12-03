import React, { useEffect } from "react";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Components
import * as St from "../../styledComponents/Styledhome/StyledLetterForm";

import { signOut } from "../../redux/modules/authSlice";
import { __getPosts } from "../../redux/modules/postsSlice";

function LetterList() {
  console.log("LetterList : ", "Render");
  const dispatch = useDispatch();
  //Reducer
  const data = useSelector((state) => state.data);
  const tabReducer = useSelector((state) => state.tabSlice);
  const navigate = useNavigate();

  // post에 들어있으면 거 listArr에 담아주쇼 쥔장!@!

  const listArr = data.posts?.filter(
    (target) => target.writedTo === tabReducer
  );
  console.log(listArr);
  const navigateDetailPage = (id, userid) => {
    navigate(`/detail/${id}`, { state: userid });
  };

  useEffect(() => {
    if (data.error.isError) {
      dispatch(signOut());
      dispatch(__getPosts());
      navigate("/login");
    }
  }, [data, dispatch, navigate]);
  // 아... 이것도 컴포넌트인데... 다른곳으로 빼주고 싶지만...
  const DoShowList = () => {
    return listArr?.map((item) => {
      return (
        <St.FanLetter
          key={uuid()}
          onClick={() => navigateDetailPage(`${item.writedTo}/${item.id}`)}
        >
          <St.Comment.Div $img>
            <St.Comment.Avatar />
          </St.Comment.Div>
          <St.Comment.Div $paragraph>
            <St.Comment.Div>
              <St.Comment.Author>{item.userid}님이</St.Comment.Author>
              <St.Comment.Author>{item.writedTo}에게</St.Comment.Author>
              <St.Comment.Date>{item.createdAt} </St.Comment.Date>
            </St.Comment.Div>
            <St.Comment.Text>{item.content}</St.Comment.Text>
          </St.Comment.Div>
        </St.FanLetter>
      );
    });
  };

  return (
    <St.FanLetterContainer>
      {listArr === undefined ? (
        <St.NothingLetter>
          <St.NothingLetterParagraph>
            그대가 처음이네요.. <br />
            낭만 가득한 편지한통 써보세요
          </St.NothingLetterParagraph>
        </St.NothingLetter>
      ) : (
        <St.FanLetterWrapper>{DoShowList()}</St.FanLetterWrapper>
      )}
    </St.FanLetterContainer>
  );
}

export default React.memo(LetterList);
