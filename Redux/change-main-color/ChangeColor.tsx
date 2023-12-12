import { createSlice } from "@reduxjs/toolkit";
interface state {
  color: string;
}
let initialState: state = {
  color: "sky",
};
const ColorReducer = createSlice({
  name: "color",
  initialState,
  reducers: {
    changeColor: (state, action) => {
      state.color = action.payload;
      if (action.payload === "sky") {
        document.documentElement.style.setProperty("--MainColor", "#1d9bf0");
        document.documentElement.style.setProperty(
          "--HoverMainColor",
          "#1A8CD8"
        );
      } else if (action.payload === "yellow") {
        document.documentElement.style.setProperty("--MainColor", "#ffd400");
        document.documentElement.style.setProperty(
          "--HoverMainColor",
          "#E6BF00"
        );
      } else if (action.payload === "pink") {
        document.documentElement.style.setProperty("--MainColor", "#f91880");
        document.documentElement.style.setProperty(
          "--HoverMainColor",
          "#E01673"
        );
      } else if (action.payload === "purple") {
        document.documentElement.style.setProperty("--MainColor", "#7856ff");
        document.documentElement.style.setProperty(
          "--HoverMainColor",
          "#6C4DE6"
        );
      } else if (action.payload === "green") {
        document.documentElement.style.setProperty("--MainColor", "#00ba7c");
        document.documentElement.style.setProperty(
          "--HoverMainColor",
          "#00A770"
        );
      } else {
        document.documentElement.style.setProperty("--MainColor", "#1d9bf0");
        document.documentElement.style.setProperty(
          "--HoverMainColor",
          "#1A8CD8"
        );
      }
    },
  },
});
export default ColorReducer.reducer;
export const { changeColor } = ColorReducer.actions;
