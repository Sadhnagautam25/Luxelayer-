import { createSlice } from "@reduxjs/toolkit";

export const sellerSlice = createSlice({
  name: "seller",

  initialState: {
    sellerDetail: null,
    loading: false,
    error: null,
  },

  reducers: {
    // 🔹 Start loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // 🔹 Set seller data (create / fetch / update)
    setSellerDetail: (state, action) => {
      state.sellerDetail = action.payload;
      state.loading = false;
      state.error = null;
    },

    // 🔹 Set error
    setError: (state, action) => { 
      state.error = action.payload;
      state.loading = false;
    },

    // 🔹 Clear seller (delete account)
    clearSeller: (state) => {
      state.sellerDetail = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setLoading, setSellerDetail, setError, clearSeller } =
  sellerSlice.actions;

export default sellerSlice.reducer;
