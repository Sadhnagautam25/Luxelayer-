import axios from "axios";

const wishlistApi = axios.create({
  baseURL: "/api/wishlist",
  withCredentials: true,
});

export const wishlistToggleApi = async (productId) => {
  try {
    const res = await wishlistApi.post(`/toggle/${productId}`);
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
};

export const fetchAllWishlistProducts = async () => {
  try {
    const res = await wishlistApi.get("/all");
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
};
