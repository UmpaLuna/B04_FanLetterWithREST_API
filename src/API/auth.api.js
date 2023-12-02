import axios from "axios";

export const authAPI = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_BASE_URL,
});

// signIn - instance
export const signInInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

signInInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

signInInstance.interceptors.response.use(
  (response) => {
    const data = response.data;
    console.log(data);
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// signUp- instance

export const signUpInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

signUpInstance.interceptors.request.use(
  (config) => {
    console.log("singUp 요청에서 나는것", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

signUpInstance.interceptors.response.use(
  (respons) => {
    const data = respons.data;
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
