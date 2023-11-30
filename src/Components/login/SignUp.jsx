import React, { useRef } from "react";

import * as St from "../../styledComponents/StyledLogin/StyledLogin";
import { useNavigate } from "react-router-dom";
function SignUp({ setIsSignUp }) {
  const signUpRef = useRef({});
  const navigate = useNavigate();
  const handleSignUp = () => {
    const id = signUpRef.id;
    const pwd = signUpRef.password;
    const nickName = signUpRef.nickName;

    // ~~이 아니라면 함수종료
    if (
      id.value.length <= 4 ||
      pwd.value.length <= 4 ||
      nickName.value.length <= 4
    )
      return alert(".");

    // 그게 아니라면 authSlice에 업뎃 그리고 login화면으로
    navigate("/login");
  };
  return (
    <St.LoginContainer onClick={(e) => e.preventDefault()}>
      <St.LoginBox>
        <St.LoginFormImage />
        {/* input id,pwd모음 */}
        <St.SignUpInputsForward ref={signUpRef} />
        <St.SignUpButton onClick={handleSignUp}>회원가입</St.SignUpButton>
        <St.SubmitButton
          onClick={() => {
            setIsSignUp(false);
          }}
        >
          로그인 창으로
        </St.SubmitButton>
      </St.LoginBox>
    </St.LoginContainer>
  );
}

export default React.memo(SignUp);
