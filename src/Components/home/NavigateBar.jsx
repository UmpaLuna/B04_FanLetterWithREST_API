import React, { memo } from "react";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";

//Components & ReduxModules
import * as St from "../../styledComponents/Styledhome/StyledNavigate";
import { changeTabStringName } from "../../redux/modules/tabSlice";
import theme from "../../styledComponents/theme/theme";
function NavigateBar() {
  console.log("NaviageBar :", "Render");

  // Redux
  const tabReducer = useSelector((state) => state.tabSlice);
  const dispatch = useDispatch();
  const characters = theme.character;
  console.log("tabReducer", tabReducer);
  return (
    <St.NavContainer>
      {characters.map((item, idx) => {
        return (
          <St.NavigateItem
            onClick={() => {
              console.log("item", item);
              dispatch(changeTabStringName(item));
            }}
            $isActive={tabReducer}
            $item={item}
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
