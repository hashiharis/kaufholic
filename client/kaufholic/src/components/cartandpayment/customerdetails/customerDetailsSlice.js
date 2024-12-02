import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerDetails: {},
  productDetails: [],
  paymentDetails: {},
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
    saveCardDetails: (state, action) => {
      let { cardHName, cardNo, expiryDate, cvv } = action.payload;

      let obj = {
        cardHName,
        cardNo,
        expiryDate,
        cvv,
      };
      state.paymentDetails = obj;
    },
  },
});

export const selectCustomerDetails = (state) => state.customerDetails;
export const { saveCustomerDetails, saveProductDetails, saveCardDetails } =
  customerDetailsSlice.actions;
export default customerDetailsSlice.reducer;
