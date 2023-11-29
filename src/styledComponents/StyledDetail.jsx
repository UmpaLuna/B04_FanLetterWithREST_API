import styled from "styled-components";
import { StyledButton } from "./StyledForm";
export const StDetailContainer = styled.div`
  width: 400px;
  margin: 60px auto;
  background-color: #00aeef;
  padding: 2.4rem 2.6rem;
  border-radius: 12px;
  ${({ theme: { mediaQuery } }) => mediaQuery.lg`
        width: 760px;
    `}
  >:first-child {
    padding: 0 1rem;
  }
  > div {
    padding: 1rem;
  }
  p,
  span {
    display: block;
    padding: 0.5rem;
  }
`;
export const StEditButton = {
  Edit: styled(StyledButton)`
    background-color: #fff;
    &:hover {
      background-color: #6da36d;
    }
  `,
  Update: styled(StyledButton)`
    display: inline-block;
    margin-top: 12px;
    background-color: #000;
    color: #fff;
  `,
  Remove: styled(StyledButton)`
    background-color: #fc4f4f;
    border: 1px solid transparent;
    margin-left: 12px;
    color: #fff;
    &:hover {
      background-color: #fff;
      color: #fc4f4f;
    }
  `,
};
