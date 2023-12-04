import React, { useEffect, useState } from "react";
import SignIn from "../Components/login/SignIn";
import SignUp from "../Components/login/SignUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [isChange, setIsChange] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const notifySignUp = {
    signUpSuccess: () => toast.success("회원가입완료", { autoClose: 3000 }),
    signUpFailed: () => toast.error("거 똑바로 치쇼", { autoClose: 2000 }),
  };

  useEffect(() => {
    if (!isSignUp) return;
    notifySignUp.signUpSuccess();
    setIsSignUp(false);
  }, [isSignUp]);

  return (
    <>
      {isChange ? (
        <SignUp setIsSignUp={setIsSignUp} setIsChange={setIsChange} />
      ) : (
        <SignIn setIsChange={setIsChange} />
      )}
      <ToastContainer />
    </>
  );
}

export default Login;
