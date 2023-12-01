import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Layout from "../pages/Layout";
import { useEffect } from "react";
import { removeAccessTokenWhereLocalStorage } from "../API/localStorageApi";

const Router = () => {
  console.log("Router :", "Render");
  useEffect(() => {
    return () => {
      console.log("removeLocalStorageData");
      removeAccessTokenWhereLocalStorage();
    };
  }, []);

  return (
    <BrowserRouter>
      {/* 로그인, 홈, 상세,프로필 */}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path={`detail/:member/:id`} element={<Detail />} />

        {/* 404 */}
        <Route path="*" element={<h1>404 찾을수 없으셈</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
