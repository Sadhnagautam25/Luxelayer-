import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
    loading: false,
    error: null,
  },

  reducers: {
    setWishlistItems: (state, action) => {
      state.wishlistItems = action.payload;
      state.loading = false;
      state.error = null;
    },

    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    },

    clearWishlist: (state) => {
      state.wishlistItems = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setWishlistItems, setLoading, setError, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
