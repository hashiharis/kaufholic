import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  crntBuyer: {},
};

export const buyerSlice = createSlice({
  name: "buyerDetails",
  initialState,
  reducers: {
    saveBuyerDetails: (state, action) => {
      let { name, email } = action.payload;
      let obj = {
        name,
        email,
      };

      state.crntBuyer = obj;
    },
  },
});

export const selectCurrentBuyerDetails = (state) => state.currentBuyer;
export const { saveBuyerDetails } = buyerSlice.actions;
export default buyerSlice.reducer;
