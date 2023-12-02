import axios from "axios";

// 조회하기
const getPostAxiosApi = axios.create({
  baseURL: process.env.REACT_APP_POSTS_URL,
});

// 요청할 때 무언가 해주고 싶을 때
getPostAxiosApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

getPostAxiosApi.interceptors.response.use(
  (response) => {
    const data = response.data;
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default getPostAxiosApi;
