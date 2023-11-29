import React from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

// Components
import * as St from "../styledComponents/StyledHeader";
import theme from "../styledComponents/theme/theme";

function Header() {
  const characters = theme.character;

  console.log("Header:", "Render");
  return (
    <St.LayoutHeader>
      <St.LayoutNavBar>
        <Link to={"/"}>
          <St.LayoutLogoContainer>
            <St.LayoutLogoImg />
          </St.LayoutLogoContainer>
        </Link>
        <St.LayoutBox>
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
