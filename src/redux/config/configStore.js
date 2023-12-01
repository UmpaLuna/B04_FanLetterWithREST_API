import { configureStore } from "@reduxjs/toolkit";
import tabSlice from "../modules/tabSlice";
import fanLetterData from "../modules/fanLetterDataSlice";
import auth from "../modules/authSlice";
const store = configureStore({
  reducer: {
    tabSlice,
    fanLetterData,
    auth,
  },
});

export default store;
