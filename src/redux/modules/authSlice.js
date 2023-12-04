import { createSlice } from "@reduxjs/toolkit";
import { removeAccessTokenWhereLocalStorage } from "../../API/localStorageApi";

const initialState = {
  accessToken: "",
  userId: "",
  success: "",
  pwd: "",
  avatar: null,
  nickname: "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp(state, { payload }) {
      state = payload;
      return state;
    },
    signIn(state, { payload }) {
      console.log(payload);
      state = payload;
      return state;
    },
    signOut(state, { payload }) {
      removeAccessTokenWhereLocalStorage();
      state = initialState;
      return state;
    },
    upDateProfile(state, { payload }) {
      state.avatar = payload.avatar;
    },
  },
});

export const { signUp, signIn, signOut, upDateProfile } = auth.actions;
export default auth.reducer;
