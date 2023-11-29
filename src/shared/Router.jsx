import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Layout from "../Components/layout/Layout";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
const Router = () => {
  console.log("Router :", "Render");

  return (
    <BrowserRouter>
      {/* 로그인, 홈, 상세,프로필 */}
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path={`detail/:member/:id`} element={<Detail />} />
          <Route path="/profile/:id" element={<Profile />} />
          {/* 404 */}
          <Route path="*" element={<h1>404 찾을수 없으셈</h1>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
