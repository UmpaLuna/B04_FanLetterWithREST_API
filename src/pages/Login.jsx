import React, { useState } from "react";
import SignIn from "../Components/login/SignIn";
import SignUp from "../Components/login/SignUp";
function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <>
      {isSignUp ? (
        <SignUp setIsSignUp={setIsSignUp} />
      ) : (
        <SignIn setIsSignUp={setIsSignUp} />
      )}
    </>
  );
}

export default Login;
