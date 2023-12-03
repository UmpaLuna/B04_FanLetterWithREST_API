import axios from "axios";
import { authAPI } from "./auth.api";
import { getAccessTokenFromLocalStorage } from "./localStorageApi";
export const postsAPI = axios.create({
  baseURL: process.env.REACT_APP_POSTS_API_BASE_URL,
});

// 요청을 보내기 직전에 무언가 하고 싶을 때
postsAPI.interceptors.request.use(
  async (config) => {
    try {
      const data = getAccessTokenFromLocalStorage();
      if (data) {
        console.log(data);
        await authAPI.get("/user");
      }
    } catch (error) {
      throw new Error(error);
    }
    // 인증서버에다 먼저 요청보내고 인증처리로 요청 보내는걸 검사해주기

    // config를 return 하지 않으면 요청을 못함
    return config;
  },
  (error) => {
    // 왜 안나오는지 request 요청 에러가..
    console.log("request요청 에러 만들어봄", error);
    return Promise.reject(error);
  }
);

// 응답을 받은 '직'후에 무언가 하고 싶을 때
postsAPI.interceptors.response.use(
  (response) => {
    const data = response.data;
    return data;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default postsAPI;
