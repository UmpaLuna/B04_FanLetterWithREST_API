import { createSlice } from "@reduxjs/toolkit";

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
      state = payload;
      return state;
    },
    signOut(state, { payload }) {
      state = initialState;
      console.log(initialState);
      console.log(state);
      return state;
    },
  },
});

export const { signUp, signIn, signOut } = auth.actions;
export default auth.reducer;
