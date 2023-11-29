import styled from "styled-components";

export const FormContainer = styled.div`
  margin: 0 auto;
  max-width: 380px;
  padding: 0 2.4rem;
`;
export const Form = styled.form`
  padding: 2rem 0;
  border: 1px solid #58bce0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  border-radius: 17px;
`;
export const StyledButton = styled.button`
  width: 80px;
  height: 26px;
  padding: 4px 6px;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 12px;

  &:hover {
    transition: background-color 0.4s;
    background-color: #00aeef;
    color: #fff;

    border: 1px solid transparent;
  }
`;
export const InputLabel = styled.label`
  font-size: 1.5rem;
  width: 70px;
  ${(props) =>
    props.$select &&
    `width: 140px;
     font-size: 1.2rem;
     line-height: 1
    `}
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 2rem;
  justify-content: space-between;
`;
export const Input = styled.input.attrs((props) => ({
  type: "text",
  maxLength: `${props.maxLength || 20}`,
}))`
  flex-basis: 70%;

  padding: 0.5rem 0.8rem;
  padding-left: 10px;
  ${(props) =>
    (props.as === "textarea" &&
      `
      width: 100%;
      height: 120px;
      resize: none; `) ||
    (props.as === "select" &&
      `
      flex-basis: 120px;
      `)}
  ${(props) => props.$detail && "width: 100%; "}
`;
export const Button = styled(StyledButton).attrs({
  type: "button",
})``;
