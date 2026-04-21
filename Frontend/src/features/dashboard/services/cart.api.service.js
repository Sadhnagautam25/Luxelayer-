import axios from "axios";

const cartApi = axios.create({
  baseURL: "/api/cart",
  withCredentials: true,
});

// 🔥 ADD TO CART
export const addToCartApi = async (cartData) => {
  try {
    const res = await cartApi.post("/add-to-cart", cartData);
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Failed to add to cart",
      }
    );
  }
};

// 🔥 GET CART
export const getCartApi = async () => {
  try {
    const res = await cartApi.get("/my-cart");
    return res.data.cart;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Failed to fetch cart",
      }
    );
  }
};

// 🔥 INCREASE QTY
export const increaseCartApi = async (data) => {
  try {
    const res = await cartApi.post("/increase", data);
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Failed to increase quantity",
      }
    );
  }
};

// 🔥 DECREASE QTY
export const decreaseCartApi = async (data) => {
  try {
    const res = await cartApi.post("/decrease", data);
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Failed to decrease quantity",
      }
    );
  }
};

// 🔥 REMOVE ITEM
export const removeFromCartApi = async (productId, size) => {
  try {
    const res = await cartApi.delete(`/remove/${productId}`, {
      data: { size },
    });

    return res.data;
  } catch (error) {
    throw error?.response?.data || { message: "Failed to remove item" };
  }
};
