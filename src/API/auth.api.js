import axios from "axios";
import {
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from "./localStorageApi";

export const authAPI = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_BASE_URL,
});

// 요청전
authAPI.interceptors.request.use(
  (config) => {
    const data = getAccessTokenFromLocalStorage();

    if (data) {
      config.headers["Authorization"] = `Bearer ${data.accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log("authAPI REQUEST", error);
    //return promise reject를 해주는가?
    //try cath문에서 에러 처리를 해주려고 하는것 때문인가?
    console.log(error);
    return Promise.reject(error);
  }
);

// 응답받은 직후
authAPI.interceptors.response.use(
  async (response) => {
    const data = response.data;
    return data;
  },
  (error) => {
    const res = error.response;
    console.log("authAPIRESPONES", res);
    return Promise.reject(res);
  }
);

// 로그인시

// 로그인 유효토큰 시간대
const tokenlimitedTime = "10m";
export const cancelTokenWarningAlertTime = 3000;
export const cancelTokenStartTime = 597000;

export const signInRequestJWTAcessServer = async (info) => {
  try {
    const isConfirmedUser = await authAPI.post(
      `/login?expiresIn=${tokenlimitedTime}`,
      info
    );
    // 로컬에 먼저 저장 후 다시 받아오고나서
    setAccessTokenToLocalStorage(isConfirmedUser);
    const activateAuthInfo = getAccessTokenFromLocalStorage();
    if (!activateAuthInfo.accessToken) throw new Error("유효한 토근 없으셈");
    return activateAuthInfo;
  } catch (error) {
    throw new Error(error);
  }
};

// 회원가입시
export const signUpRequestJWTPermission = async (info) => {
  try {
    await authAPI.post("/register", info);
  } catch (error) {
    console.log("signUp에서 나는 :", error);
    throw new Error(error);
  }
};
