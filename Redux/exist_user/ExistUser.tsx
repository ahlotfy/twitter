import { createSlice } from "@reduxjs/toolkit";
interface state {
  userInfo: {
    displayName: string;
    email: string;
    joined: string;
    mention: string;
    uid: string;
    birthDay: string;
    verified: boolean;
    phone: string;
    gender: string;
    backgroundSrc: string;
    avatar: string;
    bio: string | number;
  };
}
let initialState: state = {
  userInfo: {
    displayName: "",
    email: "",
    joined: "",
    mention: "",
    uid: "",
    birthDay: "",
    verified: false,
    phone: "",
    gender: "",
    backgroundSrc: "",
    avatar: "",
    bio: "",
  },
};
const existUserReducer = createSlice({
  name: "user-data",
  initialState,
  reducers: {
    userState: (state, action) => {
      state.userInfo.displayName = action.payload?.displayName;
      state.userInfo.email = action.payload?.email;
      state.userInfo.joined = action.payload?.joined;
      state.userInfo.uid = action.payload?.uid;
      state.userInfo.mention = action.payload?.mention;
      state.userInfo.birthDay = action.payload?.birthDay;
      state.userInfo.verified = action.payload?.verified;
      state.userInfo.phone = action.payload?.phone;
      state.userInfo.gender = action.payload?.gender;
      state.userInfo.backgroundSrc = action.payload?.backgroundSrc;
      state.userInfo.avatar = action.payload?.avatar;
      state.userInfo.bio = action.payload?.bio;
    },
  },
});
export default existUserReducer.reducer;
export const { userState } = existUserReducer.actions;
