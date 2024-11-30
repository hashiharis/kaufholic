import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerDetails: {},
  productDetails: [],
};

export const customerDetailsSlice = createSlice({
  name: "customerDetail",
  initialState,
  reducers: {
    saveCustomerDetails: (state, action) => {
      let { email, fName, lName, stateRegion, address, contact } =
        action.payload;
      let obj = {
        email,
        fName,
        lName,
        stateRegion,
        address,
        contact,
      };
      state.customerDetails = obj;
    },
    saveProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
  },
});

export const selectCustomerDetails = (state) => state.customerDetails;
export const { saveCustomerDetails, saveProductDetails } =
  customerDetailsSlice.actions;
export default customerDetailsSlice.reducer;
