import styled, { css } from "styled-components";

// main 화면

export const StMain = styled.main`
  position: relative;
  height: 60vh;
  ${({ theme: { mediaQuery } }) => mediaQuery.lg`height: 80vh`}
`;
const StDiv = styled.div``;

const createMainBgImg = (URL) => css`
  ${({ theme: { imgSrc } }) =>
    `background-image : url(${process.env.PUBLIC_URL + imgSrc.mainImg[URL]});
    background-repeat : no-repeat;
    background-size : cover;
    background-position: center center;
    `};
`;

export const StMainDivImg = styled(StDiv)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.$first && 1) || 0};
  transition: all 0.4s;
  ${(props) => createMainBgImg(props.$bgUrl)};
`;
