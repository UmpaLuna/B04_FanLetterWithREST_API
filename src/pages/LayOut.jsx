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

  const NumberCountDown = () => {
    const [count, setCount] = useState(3);
    const setIntervalCount = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    useEffect(() => {
      return () => {
        clearInterval(setIntervalCount);
      };
    });
    console.log(count);
    return <div>이제 카운트 다운 {count}</div>;
  };
  // login 시, localStorage에 있는 accessToken 말고 redux에 있는 auth에 있는 걸로  home 보여주기, 아니면 login만 주구장창 보여주긔, 가엽긔

  const requestAuthorization = useCallback(
    (token) => {
      if (!token) return;
      const isAuthorizedToken = setInterval(async () => {
        try {
          await authAPI.get("/user", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (error === 401) {
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
    [dispatch, navigate, notifySignIn]
  );
  useEffect(() => {
    const authorizedUser = getAccessTokenFromLocalStorage();
    // 새로고침시 auth값 초기화 되니까 -- 로그아웃하면 없애주자
    !auth.accessToken && dispatch(signIn(authorizedUser));
    authorizedUser.accessToken ? navigate("/home") : navigate("/login");
  }, [auth, navigate, dispatch, requestAuthorization]);
  useEffect(() => {
    const authorizedUser = getAccessTokenFromLocalStorage();
    if (!authorizedUser.accessToken) return;
    requestAuthorization(authorizedUser.accessToken);
  }, [auth.accessToken, requestAuthorization]);
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
