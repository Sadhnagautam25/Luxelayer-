import { useDispatch } from "react-redux";
import {
  wishlistToggleApi,
  fetchAllWishlistProducts,
} from "../services/userWishlist.api.service";

import {
  setWishlistItems,
  setError,
  setLoading,
} from "../states/wishlist.slice";

import toast from "react-hot-toast";

export function useWishlist() {
  const dispatch = useDispatch();

  // 🔥 TOGGLE WISHLIST
  const toggleWishlist = async (productId) => {
    try {
      dispatch(setLoading());

      await wishlistToggleApi(productId);

      const res = await fetchAllWishlistProducts();

      dispatch(setWishlistItems(res.wishlistProducts));

      toast.success("Wishlist updated ❤️");
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  // 🔥 GET ALL WISHLIST PRODUCTS
  const getWishlistProducts = async () => {
    try {
      dispatch(setLoading());

      const res = await fetchAllWishlistProducts();

      dispatch(setWishlistItems(res.wishlistProducts));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  return {
    toggleWishlist,
    getWishlistProducts,
  };
}

export default useWishlist;
