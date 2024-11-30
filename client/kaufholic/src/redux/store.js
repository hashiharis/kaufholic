import { configureStore } from "@reduxjs/toolkit";
import buyerSlice from "../components/navbar/usernavbar/buyernavbar/buyerSlice";
import customerDetailsSlice from "../components/cartandpayment/customerdetails/customerDetailsSlice";

export const store = configureStore({
  reducer: {
    currentBuyer: buyerSlice,
    customerDetails: customerDetailsSlice,
  },
});
