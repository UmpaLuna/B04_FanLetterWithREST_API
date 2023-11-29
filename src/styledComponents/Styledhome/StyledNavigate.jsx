import styled from "styled-components";

export const NavContainer = styled.div`
  margin: 0 auto;
  margin-top: 2.4rem;
  max-width: 360px;
  padding: 2rem 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  border: 1px solid transparent;
  text-align: center;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
    max-width: 480px;
    flex-wrap : nowrap;
  `}
`;

export const NavigateItem = styled.div`
  padding: 1.6rem 1.4rem;
  width: 48%;
  border: 1px solid black;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #00aeef;
    color: #fff;
    border: 1px solid transparent;
  }
  ${(props) =>
    parseInt(props.$isActive) === props.$idx &&
    `background-color: #00aeef; color:#fff; border: 1px solid transparent;
    `}
`;
