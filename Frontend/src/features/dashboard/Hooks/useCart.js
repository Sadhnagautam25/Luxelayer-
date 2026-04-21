import { useDispatch } from "react-redux";
import { setCart, setLoading, setError, clearCart } from "../states/cart.slice";

import {
  addToCartApi,
  getCartApi,
  increaseCartApi,
  decreaseCartApi,
  removeFromCartApi,
} from "../services/cart.api.service";

import toast from "react-hot-toast";

const useCart = () => {
  const dispatch = useDispatch();

  // 🔥 GET CART
  const handleGetCart = async () => {
    try {
      dispatch(setLoading(true));

      const data = await getCartApi();

      dispatch(setCart(data.items || []));

      return data;
    } catch (error) {
      dispatch(setError(error?.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔥 ADD TO CART
  const handleAddToCart = async (cartData) => {
    try {
      dispatch(setLoading(true));

      const res = await addToCartApi(cartData);

      dispatch(setCart(res.cart.items));

      toast.success("Added to cart");

      return res;
    } catch (error) {
      dispatch(setError(error?.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔥 INCREASE QUANTITY
  const handleIncrease = async (productId, size) => {
    try {
      dispatch(setLoading(true));

      const res = await increaseCartApi({ productId, size });

      dispatch(setCart(res.cart.items));

      return res;
    } catch (error) {
      dispatch(setError(error?.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔥 DECREASE QUANTITY
  const handleDecrease = async (productId, size) => {
    try {
      dispatch(setLoading(true));

      const res = await decreaseCartApi({ productId, size });

      dispatch(setCart(res.cart.items));

      return res;
    } catch (error) {
      dispatch(setError(error?.message));

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔥 REMOVE ITEM
  const handleRemoveFromCart = async (productId, size) => {
    try {
      dispatch(setLoading(true));

      const res = await removeFromCartApi(productId, size);

      dispatch(setCart(res.cart.items));

      return res;
    } catch (error) {
      dispatch(setError(error?.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔥 CLEAR CART (LOCAL ONLY)
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return {
    handleGetCart,
    handleAddToCart,
    handleIncrease,
    handleDecrease,
    handleRemoveFromCart,
    handleClearCart,
  };
};

export default useCart;
