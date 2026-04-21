import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Added logout to reset the state completely
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, logout, clearError } =
  authSlice.actions;

export default authSlice.reducer;
