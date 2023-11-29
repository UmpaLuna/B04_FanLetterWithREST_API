import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

export const LayoutHeader = styled.header`
  color: #333;
`;

export const LayoutLogoContainer = styled.div`
  padding: 0.5rem 1rem;
  height: 100%;
  width: 140px;
  cursor: pointer;
  &:hover {
    transition: all 0.5s;
    filter: brightness(0.5);
  }
  ${({ theme: { mediaQuery } }) => {
    return mediaQuery.md`
    width: 180px;
  `;
  }}
`;
export const LayoutNavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 1.2rem;
  ${({ theme: { mediaQuery } }) => mediaQuery.lg`
  max-width: 1366px;
  margin-left: auto;
  margin-right: auto;
  `}
`;
export const LayoutBox = styled.ul`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 0.8rem;
  padding: 0 1rem;
`;

export const LayoutItem = styled.li`
  display: none;
  height: 100%;
  font-size: 1.4rem;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  padding: 1.5rem 1rem;
  cursor: pointer;
  &:hover {
    transition-property: background-color, color;
    transition-duration: 0.4s;
    background-color: #00aeef;
    color: #fff;
    border-radius: 12px;
  }
  ${({ theme: { mediaQuery } }) => {
    return mediaQuery.md`
    display: block;
  `;
  }}
`;
export const LayoutSearchIcon = styled(BsSearch)`
  font-size: 24px;
  color: #00aeef;
  cursor: pointer;
  &:hover {
    transition: all 0.3s;
    color: #333;
  }
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
  font-size : 26px;
  margin-right: 2.6rem;
  `}
`;
// attrs는 객체를 반환 해줘야 하므로 => 후에는 (),소괄호로 감싸준 중괄호로 반환 해야함
// 그런 후
export const LayoutLogoImg = styled.img.attrs(({ theme: { imgSrc } }) => ({
  src: `${process.env.PUBLIC_URL + imgSrc.logo}`,
}))``;
