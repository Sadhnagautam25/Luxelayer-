import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice/auth.slice";
import sellerReducer from "../features/dashboard/states/seller.Slice";
import productReducer from "../features/dashboard/states/product.slice";
import wishlistReducer from "../features/dashboard/states/wishlist.slice";
import addressReducer from "../features/dashboard/states/address.slice";
import cartReducer from "../features/dashboard/states/cart.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    seller: sellerReducer,
    product: productReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
    cart: cartReducer,
  },
});
