import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as St from "../../styledComponents/StyledLogin/StyledLogin";
import { useDispatch } from "react-redux";
import { signInRequestJWTAcessServer } from "../../API/auth.api";
import { signIn } from "../../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";

function SignIn({ setIsChange }) {
  const signInRef = useRef({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifySignUp = {
    signUpFailed: () => toast.error("거 똑바로 치쇼", { autoClose: 2000 }),
  };
  const handleSignIn = async () => {
    const id = signInRef.id;
    const pwd = signInRef.password;

    if (id.value.length <= 4 || pwd.value.length <= 4)
      return notifySignUp.signUpFailed();
    const authInfo = {
      id: signInRef.id.value,
      password: signInRef.password.value,
    };
    try {
      const permitedUser = await signInRequestJWTAcessServer(authInfo);
      dispatch(signIn(permitedUser));
      navigate("/home");
    } catch (error) {
      console.log("로그인시 문제가 되는:", error);
    }
  };

  return (
    <St.LoginContainer onClick={(e) => e.preventDefault()}>
      <St.LoginBox>
        <St.LoginFormImage />
        {/* input id,pwd모음 */}
        <St.SiginInInputsForwadRef ref={signInRef} />
        <St.SubmitButton onClick={handleSignIn}> 로그인 하기 </St.SubmitButton>
        <St.SignUpButton onClick={() => setIsChange(true)}>
          회원가입
        </St.SignUpButton>
      </St.LoginBox>
    </St.LoginContainer>
  );
}

export default React.memo(SignIn);
