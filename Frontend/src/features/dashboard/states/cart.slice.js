import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },

    addItemToCart: (state, action) => {
      const newItem = action.payload;

      const existing = state.cartItems.find(
        (item) =>
          item.product === newItem.product && item.size === newItem.size,
      );

      if (existing) {
        existing.quantity += newItem.quantity || 1;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: newItem.quantity || 1,
        });
      }
    },

    updateQuantity: (state, action) => {
      const { productId, size, type } = action.payload;

      const item = state.cartItems.find(
        (i) => i.product === productId && i.size === size,
      );

      if (item) {
        if (type === "inc") {
          item.quantity += 1;
        } else if (type === "dec" && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
    },

    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => !(item.product === productId && item.size === size),
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCart,
  addItemToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;
