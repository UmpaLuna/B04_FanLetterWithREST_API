import React, { memo } from "react";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";

//Components & ReduxModules
import * as St from "../styledComponents/StyledNavigate";
import { changeTabNumber } from "../redux/modules/tabReducer";
import theme from "../styledComponents/theme/theme";
function NavigateBar() {
  console.log("NaviageBar :", "Render");

  // Redux
  const tabReducer = useSelector((state) => state.tabReducer);
  const dispatch = useDispatch();
  const characters = theme.character;

  return (
    <St.NavContainer>
      {characters.map((item, idx) => {
        return (
          <St.NavigateItem
            onClick={() => {
              dispatch(changeTabNumber(idx));
            }}
            $isActive={tabReducer}
            $idx={idx}
            key={uuid()}
          >
            {item}
          </St.NavigateItem>
        );
      })}
    </St.NavContainer>
  );
}

export default memo(NavigateBar);
