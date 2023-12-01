import React, { useRef } from "react";
import * as St from "../../styledComponents/StyledLogin/StyledLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUpInstance } from "../../API/loginAxios";
function SignUp({ setIsSignUp, setIsChange }) {
  const signUpRef = useRef({});
  const notifySignUp = {
    signUpSuccess: () => toast.success("회원가입완료", { autoClose: 2000 }),
    signUpFailed: () => toast.error("거 똑바로 치쇼", { autoClose: 2000 }),
  };

  const handleSignUp = async () => {
    const id = signUpRef.id;
    const pwd = signUpRef.password;
    const nickName = signUpRef.nickName;

    // ~~이 아니라면 함수종료
    if (
      id.value.length <= 4 ||
      pwd.value.length <= 4 ||
      nickName.value.length <= 4
    ) {
      return notifySignUp.signUpFailed();
    }

    // 그게 아니라면 authSlice에 업뎃 그리고 login화면으로
    await requestSignUpJwtServer().then(() => {
      setIsSignUp(true);
      setIsChange(false);
    });
  };
  const requestSignUpJwtServer = async () => {
    try {
      const authSignUpInfo = await signUpInstance.post("/register", {
        id: signUpRef.id.value,
        password: signUpRef.password.value,
        nickname: signUpRef.nickName.value,
      });
      console.log(authSignUpInfo);
    } catch (error) {
      console.log("signUp에서 나는 에러", error);
    }
  };

  return (
    <>
      <St.LoginContainer onClick={(e) => e.preventDefault()}>
        <St.LoginBox>
          <St.LoginFormImage />
          {/* input id,pwd모음 */}
          <St.SignUpInputsForward ref={signUpRef} />
          <St.SignUpButton onClick={handleSignUp}>회원가입</St.SignUpButton>
          <St.SubmitButton
            onClick={() => {
              setIsChange(false);
            }}
          >
            로그인 창으로
          </St.SubmitButton>
        </St.LoginBox>
      </St.LoginContainer>
      <ToastContainer />
    </>
  );
}

export default React.memo(SignUp);
