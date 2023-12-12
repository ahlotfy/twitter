import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeReducer";
import langReducer from "./lang/langReducer";
import showWindowReducer from "./show_window/ShowWindow";
import ColorReducer from "./change-main-color/ChangeColor";
import FontReducer from "./change-font-size/ChangeFontSize";
import existUserReducer from "./exist_user/ExistUser";
import StepsCreateAccountReducer from "./steps_create-account/StepsCreateAccount";
import GetCommentData from "./get_comment_Data/GetCommentData";
import quoteDataReducer from "./quote-data/QuoteData";
import reportReducer from "./report/Report";
import editImg from "./edit_Imgs/EditImgs";

const storeRedux = configureStore({
  reducer: {
    theme: themeReducer,
    lang: langReducer,
    showWindow: showWindowReducer,
    color: ColorReducer,
    font: FontReducer,
    steps: StepsCreateAccountReducer,
    getCommentData: GetCommentData,
    existUser: existUserReducer,
    quoteData: quoteDataReducer,
    editImg: editImg,
    report: reportReducer,
  },
});
export default storeRedux;
