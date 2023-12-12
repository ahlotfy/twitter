import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  commentData: [],
};
const GetCommentData = createSlice({
  name: "comment_data",
  initialState,
  reducers: {
    COMMENT_DATA: (state, action) => {
      state.commentData = action.payload;
    },
  },
});
export default GetCommentData.reducer;
export const { COMMENT_DATA } = GetCommentData.actions;
