import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  avatarSrc: "",
  readerAvatar: "",
  runderedAvatar: 0,
  backgroundSrc: "",
  readerBackground: "",
  runderedBackgroundImg: 0,
};
const editImg = createSlice({
  name: "edit_img",
  initialState,
  reducers: {
    // Avatar
    changeAvatarSrc: (state, action) => {
      state.avatarSrc = action.payload;
    },
    changeReaderAvatar: (state, action) => {
      state.readerAvatar = action.payload;
    },
    runderAvatar: (state, action) => {
      state.runderedAvatar = action.payload;
    },
    // Background Img
    changeBackgroundImgSrc: (state, action) => {
      state.backgroundSrc = action.payload;
    },
    changeReaderBackgroundImg: (state, action) => {
      state.readerBackground = action.payload;
    },
    runderBackgroundImg: (state, action) => {
      state.runderedBackgroundImg = action.payload;
    },
  },
});
export default editImg.reducer;
export const {
  changeAvatarSrc,
  changeReaderAvatar,
  runderAvatar,
  changeBackgroundImgSrc,
  changeReaderBackgroundImg,
  runderBackgroundImg,
} = editImg.actions;
