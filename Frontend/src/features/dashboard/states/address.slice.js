import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
  name: "address",

  initialState: {
    addresses: [],
    singleAddress: null,
    loading: false,
    error: null,
    success: false,
    message: null,
  },

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },

    setSingleAddress: (state, action) => {
      state.singleAddress = action.payload;
    },

    setSuccess: (state, action) => {
      state.success = action.payload;
    },

    setMessage: (state, action) => {
      state.message = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearAddressState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },

    clearSingleAddress: (state) => {
      state.singleAddress = null;
    },

    clearAddresses: (state) => {
      state.addresses = [];
    },
  },
});

export const {
  setLoading,
  setAddresses,
  setSingleAddress,
  setSuccess,
  setMessage,
  setError,
  clearAddressState,
  clearSingleAddress,
  clearAddresses,
} = addressSlice.actions;

export default addressSlice.reducer;