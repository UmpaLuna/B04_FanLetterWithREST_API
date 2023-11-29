import React, { useCallback } from "react";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Components
import * as St from "../styledComponents/StyledLetterForm";
import theme from "../styledComponents/theme/theme";

function LetterList() {
  console.log("LetterList : ", "Render");

  //Reducer
  const fanLetterData = useSelector((state) => state.fanLetterData);
  const tabReducer = useSelector((state) => state.tabReducer);
  const characters = theme.character;

  // Component
  const listArr = fanLetterData.value[characters[tabReducer]];
  const navigate = useNavigate();
  const navigateDetailPage = useCallback(
    (id) => {
      navigate(`/detail/${id}`);
    },
    [navigate]
  );

  const DoShowList = () => {
    return listArr.map((item) => {
      return (
        <St.FanLetter
          key={uuid()}
          onClick={() => navigateDetailPage(`${item.target}/${item.id}`)}
        >
          <St.Comment.Div $img>
            <St.Comment.Avatar />
          </St.Comment.Div>
          <St.Comment.Div $paragraph>
            <St.Comment.Div>
              <St.Comment.Author>{item.name}</St.Comment.Author>
              <St.Comment.Date>{item.date}</St.Comment.Date>
            </St.Comment.Div>
            <St.Comment.Text>{item.text}</St.Comment.Text>
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
