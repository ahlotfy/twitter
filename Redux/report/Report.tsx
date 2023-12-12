import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  report: { typePost: "", idPost: "" },
};
const reportReducer = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReportValue: (state, action) => {
      state.report = action.payload;
    },
  },
});
export default reportReducer.reducer;
export const { setReportValue } = reportReducer.actions;
