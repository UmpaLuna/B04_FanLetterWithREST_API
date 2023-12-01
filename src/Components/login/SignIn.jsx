import React, { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as St from "../../styledComponents/StyledLogin/StyledLogin";
import { useDispatch, useSelector } from "react-redux";
import { signInInstance } from "../../API/login";
import { signIn } from "../../redux/modules/authSlice";

function SignIn({ setIsChange }) {
  const signInRef = useRef({});
  const dispatch = useDispatch();
  const notifySignUp = {
    signUpSuccess: () => toast.success("로그인완료", { autoClose: 3000 }),
    signUpFailed: () => toast.error("거 똑바로 치쇼", { autoClose: 2000 }),
  };
  const handleSignIn = async () => {
    const id = signInRef.id;
    const pwd = signInRef.password;

    if (id.value.length <= 4 || pwd.value.length <= 4)
      return notifySignUp.signUpFailed();

    await requestJwtServer();
  };

  const requestJwtServer = async () => {
    try {
      const confirmUser = await signInInstance.post("/login", {
        id: signInRef.id.value,
        password: signInRef.password.value,
      });
      notifySignUp.signUpSuccess();
      console.log(confirmUser);
      dispatch(signIn(confirmUser));
    } catch (error) {
      console.log(error);
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
