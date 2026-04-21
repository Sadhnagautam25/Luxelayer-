import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  myProducts: [],
  singleProduct: null,
  categoryProducts: [],
  similarProducts: [],
  selectedCategory: "women",
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearProductError: (state) => {
      state.error = null;
    },

    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setMyProducts: (state, action) => {
      state.myProducts = action.payload;
    },

    setSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
    setCategoryProducts: (state, action) => {
      state.categoryProducts = action.payload;
    },

    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },

    setSimilarProducts: (state, action) => {
      state.similarProducts = action.payload;
    },

    clearSingleProduct: (state) => {
      state.singleProduct = null;
    },
  },
});

export const {
  setLoading,
  setError,
  clearProductError,
  setProducts,
  setMyProducts,
  setSingleProduct,
  setCategoryProducts,
  setSelectedCategory,
  setSimilarProducts,
  clearSingleProduct,
} = productSlice.actions;

export default productSlice.reducer;
