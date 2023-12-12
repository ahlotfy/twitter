import { createSlice } from "@reduxjs/toolkit";
interface state {
  isShow: boolean;
  target: string;
}
let initialState: state = {
  isShow: false,
  target: "post",
};
const showWindowReducer = createSlice({
  name: "window",
  initialState,
  reducers: {
    changeIsShowFocusWindow: (state, action) => {
      state.isShow = action.payload;
    },
    changetarget: (state, action) => {
      state.target = action.payload;
    },
  },
});
export default showWindowReducer.reducer;
export const { changeIsShowFocusWindow, changetarget } =
  showWindowReducer.actions;
