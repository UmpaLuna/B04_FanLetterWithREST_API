import { configureStore } from "@reduxjs/toolkit";
import tabSlice from "../modules/tabSlice";
import fanLetterData from "../modules/fanLetterDataSlice";
const store = configureStore({
  reducer: {
    tabSlice,
    fanLetterData,
  },
});

export default store;
