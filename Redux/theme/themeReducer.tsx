import themeFun from "../../initialize/theme/themeFun";
import { createSlice } from "@reduxjs/toolkit";
interface state {
  theme: string;
}
let initialState: state = {
  theme: "light",
};
const themeReducer = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
      themeFun(action.payload);
    },
    handleTheme: (state) => {
      //############# Light #############
      if (state.theme === "light") {
        // #1
        document.documentElement.style.setProperty("--Theme", "#fff");
        // #2
        document.documentElement.style.setProperty("--ColorElement", "#000");
        // #3
        document.documentElement.style.setProperty(
          "--HoverTheme",
          "rgba(15, 20, 25, 0.1)"
        );
        // #4
        document.documentElement.style.setProperty(
          "--LogoColor",
          "var(--MainColor)"
        );
        // #5
        document.documentElement.style.setProperty(
          "--MainBorderColor",
          " rgb(239, 243, 244)"
        );
        // #6
        document.documentElement.style.setProperty(
          "--ColorIntenseElement",
          "#536471"
        );
        // #7
        document.documentElement.style.setProperty(
          "--ColorTingeElement",
          "#0f1419"
        );
        // #8
        document.documentElement.style.setProperty(
          "--BoxShadow",
          "rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;"
        );
        //9
        document.documentElement.style.setProperty(
          "--SupportTheme",
          "#0a0a0a0a"
        );
      }
      //############# Dim #############
      else if (state.theme === "Dim") {
        // #1
        document.documentElement.style.setProperty("--Theme", "#15202b");
        // #2
        document.documentElement.style.setProperty("--ColorElement", "#fff");
        // #3
        document.documentElement.style.setProperty(
          "--HoverTheme",
          "rgba(247, 249, 249, 0.1)"
        );
        // #4
        document.documentElement.style.setProperty("--LogoColor", "#fff");
        // #5
        document.documentElement.style.setProperty(
          "--MainBorderColor",
          "rgb(56, 68, 77)"
        );
        // #6
        document.documentElement.style.setProperty(
          "--ColorIntenseElement",
          "#8b98a5"
        );
        // #7
        document.documentElement.style.setProperty(
          "--ColorTingeElement",
          "#f7f9f9"
        );
        // #8
        document.documentElement.style.setProperty(
          "--BoxShadow",
          "box-shadow: rgba(136, 153, 166, 0.2) 0px 0px 15px, rgba(136, 153, 166, 0.15) 0px 0px 3px 1px;"
        );
        //9
        document.documentElement.style.setProperty(
          "--SupportTheme",
          "#5656571c"
        );
      }
      //############# Dark #############
      else {
        // #1
        document.documentElement.style.setProperty("--Theme", "#000");
        // #2
        document.documentElement.style.setProperty("--ColorElement", "#fff");
        // #3
        document.documentElement.style.setProperty(
          "--HoverTheme",
          "rgba(231, 233, 234, 0.1)"
        );
        // #4
        document.documentElement.style.setProperty("--LogoColor", "#fff");
        // #5
        document.documentElement.style.setProperty(
          "--MainBorderColor",
          "rgb(47, 51, 54)"
        );
        // #6
        document.documentElement.style.setProperty(
          "--ColorIntenseElement",
          "#71767b"
        );
        // #7
        document.documentElement.style.setProperty(
          "--ColorTingeElement",
          "#e7e9ea"
        );
        // #8
        document.documentElement.style.setProperty(
          "--BoxShadow",
          "rgba(101, 119, 134, 0.2) 0px 0px 15px,rgba(101, 119, 134, 0.15) 0px 0px 3px 1px"
        );
        //9
        document.documentElement.style.setProperty(
          "--SupportTheme",
          "#5656571c"
        );
      }
    },
  },
});
export default themeReducer.reducer;
export const { changeTheme, handleTheme } = themeReducer.actions;
