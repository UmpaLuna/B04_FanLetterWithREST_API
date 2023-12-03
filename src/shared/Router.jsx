import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Layout from "../pages/Layout";
import { useEffect } from "react";
import { removeAccessTokenWhereLocalStorage } from "../API/localStorageApi";
import { useDispatch } from "react-redux";
import { __getPosts } from "../redux/modules/postsSlice";
const Router = () => {
  console.log("Router :", "Render");
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      console.log("removeLocalStorageData");
      removeAccessTokenWhereLocalStorage();
    };
  }, []);
  useEffect(() => {
    dispatch(__getPosts());
  }, []);
  return (
    <BrowserRouter>
      {/* 로그인, 홈, 상세,프로필 */}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
        <Route path={`detail/:member/:id`} element={<Detail />} />
        <Route path="/login" element={<Login />} />

        {/* 404 */}
        <Route path="*" element={<h1>404 찾을수 없으셈</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
