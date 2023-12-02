import React, { useCallback } from "react";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Components
import * as St from "../../styledComponents/Styledhome/StyledLetterForm";
import theme from "../../styledComponents/theme/theme";

function LetterList() {
  console.log("LetterList : ", "Render");

  //Reducer
  const data = useSelector((state) => state.data);
  const tabReducer = useSelector((state) => state.tabSlice);

  // post에 들어있으면 거 listArr에 담아주쇼 쥔장!@!

  const listArr = data.posts?.filter(
    (target) => target.writedTo === tabReducer
  );

  const navigate = useNavigate();
  const navigateDetailPage = useCallback(
    (id) => {
      navigate(`/detail/${id}`);
    },
    [navigate]
  );
  // 아... 이것도 컴포넌트인데... 다른곳으로 빼주고 싶지만...
  const DoShowList = () => {
    return listArr?.map((item) => {
      console.log(item.userid);
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
