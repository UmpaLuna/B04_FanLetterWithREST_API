import { configureStore } from "@reduxjs/toolkit";
import tabSlice from "../modules/tabSlice";
import data from "../modules/postsSlice";
import auth from "../modules/authSlice";
const store = configureStore({
  reducer: {
    tabSlice,
    data,
    auth,
  },
});

export default store;
