import React, { useRef } from "react";
import * as St from "../../styledComponents/StyledLogin/StyledLogin";
function SignIn({ setIsSignUp }) {
  const signInRef = useRef({});
  const handleSignIn = () => {
    const id = signInRef.id;
    const pwd = signInRef.password;

    if (id.value.length <= 4 || pwd.value.length <= 4) return alert(".");
  };
  return (
    <St.LoginContainer onClick={(e) => e.preventDefault()}>
      <St.LoginBox>
        <St.LoginFormImage />
        {/* input id,pwd모음 */}
        <St.SiginInInputsForwadRef ref={signInRef} />
        <St.SubmitButton onClick={handleSignIn}> 로그인 하기 </St.SubmitButton>
        <St.SignUpButton onClick={() => setIsSignUp(true)}>
          회원가입
        </St.SignUpButton>
      </St.LoginBox>
    </St.LoginContainer>
  );
}

export default React.memo(SignIn);
