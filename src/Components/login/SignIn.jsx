import React, { useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as St from "../../styledComponents/StyledLogin/StyledLogin";
import { useDispatch } from "react-redux";
import { signInInstance } from "../../API/auth.api";
import { signIn } from "../../redux/modules/authSlice";
import {
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from "../../API/localStorageApi";

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
    const authInfo = {
      id: signInRef.id.value,
      password: signInRef.password.value,
    };

    await requestJwtServer(authInfo);
  };

  const requestJwtServer = async (info) => {
    try {
      console.log(info);
      const confirmedUser = await signInInstance.post("/login", info);
      // 로컬에 먼저 저장 후 다시 받아오고나서
      console.log(confirmedUser);
      setAccessTokenToLocalStorage(confirmedUser);
      const activateAuthInfo = getAccessTokenFromLocalStorage();
      console.log(activateAuthInfo);
      if (!activateAuthInfo.accessToken)
        throw new Error("유효한 토큰이 없으셈");

      // localStorage에서 받아온 token과 함께 유저 정보 저장
      dispatch(signIn(activateAuthInfo));

      notifySignUp.signUpSuccess();
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
