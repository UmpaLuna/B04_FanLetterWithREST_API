import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

//Components & ReduxModules
import Header from "../Components/layout/Header";
import Footer from "../Components/layout/Footer";
import { getAccessTokenFromLocalStorage } from "../API/localStorageApi";
import { signIn, signOut } from "../redux/modules/authSlice";
import {
  authAPI,
  cancelTokenStartTime,
  cancelTokenWarningAlertTime,
} from "../API/auth.api";
import { useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
function Layout() {
  console.log("Layout Render");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const notifySignIn = {
    signInSuccess: () => toast.success("로그인완료"),
    alertSignOut: () =>
      toast.error(<NumberCountDown />, {
        autoClose: 2000,
      }),
  };
  console.log(auth);
  const NumberCountDown = () => {
    const [count, setCount] = useState(3);
    const setIntervalCount = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    useEffect(() => {
      return () => {
        clearInterval(setIntervalCount);
      };
    }, []);
    return <div style={{ fontSize: "24px" }}>이제 카운트 다운 {count}</div>;
  };
  // 재요청해서 토큰 검사 하기
  const requestAuthorization = useCallback(
    (token) => {
      if (!token) return;
      const isAuthorizedToken = setInterval(async () => {
        try {
          await authAPI.get("/user");
        } catch (error) {
          if (error.status === 401) {
            clearInterval(isAuthorizedToken);
            notifySignIn.alertSignOut();
            const limitedTimeOnPage = setTimeout(() => {
              clearTimeout(limitedTimeOnPage);
              navigate("/login");
              dispatch(signOut());
            }, cancelTokenWarningAlertTime);
          }
          console.log(JSON.stringify(error));
        }
      }, cancelTokenStartTime);
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    console.log(1);
    const authorizedUser = getAccessTokenFromLocalStorage();
    // 새로고침시 auth값 초기화 되니까 -- 로그아웃하면 없애주자
    !auth.accessToken && dispatch(signIn(authorizedUser));
    authorizedUser.accessToken ? navigate("/home") : navigate("/login");
  }, []);
  useEffect(() => {
    console.log(2);
    const authorizedUser = getAccessTokenFromLocalStorage();
    if (!authorizedUser.accessToken) return;
    requestAuthorization(authorizedUser.accessToken);
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Layout;
