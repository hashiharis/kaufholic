import { configureStore } from "@reduxjs/toolkit";
import buyerSlice from "../components/navbar/usernavbar/buyernavbar/buyerSlice";

export const store = configureStore({
  reducer: {
    currentBuyer: buyerSlice,
  },
});
