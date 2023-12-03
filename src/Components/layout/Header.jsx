import React from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

// Components
import * as St from "../../styledComponents/StyledLayout/StyledHeader";
import theme from "../../styledComponents/theme/theme";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/modules/authSlice";
import { getAccessTokenFromLocalStorage } from "../../API/localStorageApi";
function Header() {
  console.log("Header:", "Render");

  const characters = theme.character;
  const dispatch = useDispatch();
  const onLogOutClickHandler = () => {
    dispatch(signOut());
  };
  const activateAuth = getAccessTokenFromLocalStorage();
  return (
    <St.LayoutHeader>
      <St.LayoutNavBar>
        <St.LayoutLogoContainer>
          <Link to={"/home"}>
            <St.LayoutLogoImg />
          </Link>
        </St.LayoutLogoContainer>

        <St.LayoutBox>
          <St.LayoutLoginBox>
            {activateAuth.accessToken && <Link to={"/profile"}>내 프로필</Link>}
          </St.LayoutLoginBox>
          <St.LayoutLoginBox>
            <Link to={"/login"}>
              {activateAuth.accessToken ? (
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
