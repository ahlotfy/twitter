import { createSlice } from "@reduxjs/toolkit";
interface state {
  Font: number;
}
let initialState: state = {
  Font: 50,
};
const FontReducer = createSlice({
  name: "font",
  initialState,
  reducers: {
    changeFont: (state, action) => {
      const payload = Number.parseInt(action.payload);
      state.Font = payload;
      if (payload === 25) {
        document.documentElement.style.setProperty("--fontSizeNum", "11px");
      } else if (payload <= 50) {
        document.documentElement.style.setProperty("--fontSizeNum", "12px");
      } else if (payload <= 75) {
        document.documentElement.style.setProperty("--fontSizeNum", "13px");
      } else if (payload === 100) {
        document.documentElement.style.setProperty("--fontSizeNum", "14px");
      }
    },
  },
});
export default FontReducer.reducer;
export const { changeFont } = FontReducer.actions;
