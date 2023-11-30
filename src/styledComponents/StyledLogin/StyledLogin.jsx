import { forwardRef } from "react";
import styled from "styled-components";

// Login
export const LoginContainer = styled.form`
  min-height: 80vh;
  display: grid;
  place-content: center center;
  position: relative;

  input {
    padding: 8px;
    padding-left: 12px;
  }
`;

export const LoginBox = styled.div`
  max-width: 320px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LoginFormImage = styled.img.attrs(({ theme: { imgSrc } }) => ({
  src: `${process.env.PUBLIC_URL + imgSrc.logo}`,
}))`
  height: 60px;
  margin-bottom: 10px;
`;

const InputId = styled.input.attrs({
  type: "email",
  placeholder: "아이디는 4~10글자",
  minLength: 1,
  maxLength: 10,
})``;
const InputPassWord = styled.input.attrs({
  type: "password",
  placeholder: "비밀번호는 4~15글자",
  minLength: 4,
  maxLength: 15,
})``;
export const SiginInInputsForwadRef = forwardRef((props, ref) => {
  return (
    <>
      <InputId ref={(props) => (ref["id"] = props)} />
      <InputPassWord ref={(props) => (ref["password"] = props)} />
    </>
  );
});

export const SubmitButton = styled.button.attrs({
  type: "submit",
})`
  margin-top: 8px;
  width: 100%;
  height: 40px;
  font-size: 14px;
  padding: 10px 8px;
  text-align: center;
  border: 1px solid #00aeef;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #00aeef;
    color: #fff;
  }
`;

export const SignUpButton = styled.button.attrs({
  type: "submit",
})`
  width: 100%;
  height: 40px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #333;
  cursor: pointer;
  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

export const Label = styled.label;

// Sign Up

const SignUpNickName = styled(InputId).attrs({
  type: "text",
  placeholder: " 닉네임은 1~10글자",
  minLength: 1,
  maxLength: 10,
})``;

export const SignUpInputsForward = forwardRef((props, ref) => {
  return (
    <>
      <InputId ref={(props) => (ref["id"] = props)} />
      <InputPassWord ref={(props) => (ref["password"] = props)} />
      <SignUpNickName ref={(props) => (ref["nickName"] = props)} />
    </>
  );
});
