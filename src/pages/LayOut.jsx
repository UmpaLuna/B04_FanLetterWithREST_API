import React, { Children, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
//Components & ReduxModules
import Header from "../Components/layout/Header";
import Footer from "../Components/layout/Footer";
import { getAccessTokenFromLocalStorage } from "../API/localStorageApi";
import { signIn } from "../redux/modules/authSlice";
function Layout() {
  console.log("LayOut Render");

  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // login 시, localStorage에 있는 accessToken 말고 redux에 있는 auth에 있는 걸로  home 보여주기, 아니면 login만 주구장창 보여주긔, 가엽긔
  useEffect(() => {
    const authorizedUser = getAccessTokenFromLocalStorage();
    // 새로고침시 auth값 초기화 되니까 -- 로그아웃하면 없애주자
    !auth.accessToken && dispatch(signIn(authorizedUser));
    authorizedUser.accessToken ? navigate("/home") : navigate("/login");
  }, [auth, navigate]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
