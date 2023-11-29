import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    changeTabNumber: (state, action) => {
      return action.payload;
    },
    tabWithPayload: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const { changeTabNumber, tabWithPayload } = tabSlice.actions;
export default tabSlice.reducer;
