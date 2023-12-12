import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  lang: "en",
  dir: "ltr",
};
const langReducer = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLang: (state, action) => {
      const htmlElement: any = document.querySelector("html");
      // lang
      state.lang = action.payload;
      htmlElement.lang = state.lang;
      // dir
      state.dir = action.payload === "en" ? "ltr" : "rtl";
      htmlElement.dir = state.dir;
    },
  },
});
export default langReducer.reducer;
export const { changeLang } = langReducer.actions;
