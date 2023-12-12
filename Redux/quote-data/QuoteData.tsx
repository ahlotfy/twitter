import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  quoteData: [],
  editQuoteData: false,
};
const quoteDataReducer = createSlice({
  name: "QuoteData",
  initialState,
  reducers: {
    setQuoteData: (state, action) => {
      state.quoteData = action.payload;
    },
    editQuoteData: (state, action) => {
      state.editQuoteData = action.payload;
    },
  },
});
export default quoteDataReducer.reducer;
export const { setQuoteData, editQuoteData } = quoteDataReducer.actions;
