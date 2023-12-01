import React from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

// Components
import * as St from "../../styledComponents/StyledLayout/StyledHeader";
import theme from "../../styledComponents/theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/modules/authSlice";
function Header() {
  const characters = theme.character;
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log("Header:", "Render");
  const onLogOutClickHandler = () => {
    dispatch(signOut());
  };
  return (
    <St.LayoutHeader>
      <St.LayoutNavBar>
        <St.LayoutLogoContainer>
          <Link to={"/"}>
            <St.LayoutLogoImg />
          </Link>
        </St.LayoutLogoContainer>

        <St.LayoutBox>
          <St.LayoutLoginBox>
            {auth.accessToken && <Link to={"/profile"}>내 프로필</Link>}
          </St.LayoutLoginBox>
          <St.LayoutLoginBox>
            <Link to={"/login"}>
              {auth.accessToken ? (
                <div onClick={onLogOutClickHandler}> Logout </div>
              ) : (
                <div> Login</div>
              )}
            </Link>
          </St.LayoutLoginBox>
          <St.LayoutSearchIcon />
          {characters.map((text) => (
            <St.LayoutItem key={uuid()}>{text}</St.LayoutItem>
          ))}
        </St.LayoutBox>
      </St.LayoutNavBar>
    </St.LayoutHeader>
  );
}

export default React.memo(Header);
