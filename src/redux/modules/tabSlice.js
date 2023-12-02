import { createSlice } from "@reduxjs/toolkit";

const initialState = "드래곤볼";

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    changeTabStringName: (state, action) => {
      return action.payload;
    },
    tabWithPayload: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const { changeTabStringName, tabWithPayload } = tabSlice.actions;
export default tabSlice.reducer;
