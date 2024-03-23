import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import baseApi from "../services";

export default configureStore({
  reducer: {
    cart: cartSlice,

    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});
