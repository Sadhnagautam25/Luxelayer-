import {
  register,
  login,
  getMe,
  updateProfile,
  logout as logoutApi,
  resendVerification,
} from "../services/auth.api.service.js";

import {
  setUser,
  setError,
  setLoading,
  logout as logoutAction,
} from "../authSlice/auth.slice.js";

import { clearCart } from "../../dashboard/states/cart.slice";
import { clearWishlist } from "../../dashboard/states/wishlist.slice";
import { clearAddresses } from "../../dashboard/states/address.slice";
import { clearSingleProduct } from "../../dashboard/states/product.slice";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export function useAuth() {
  const dispatch = useDispatch();

  const handleError = (error, fallback) => {
    const message = error?.message || fallback;
    dispatch(setError(message));
    toast.error(message);
  };

  // REGISTER
  const registerUser = async (formData) => {
    try {
      dispatch(setLoading(true));
      const data = await register(formData);

      dispatch(setUser(data.user));
      toast.success("Registered successfully");

      return data;
    } catch (error) {
      handleError(error, "Register failed");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // LOGIN
  const loginUser = async (formData) => {
    try {
      dispatch(setLoading(true));
      const data = await login(formData);

      dispatch(setUser(data.user));
      toast.success("Login successful");

      return data;
    } catch (error) {
      handleError(error, "Login failed");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // GET CURRENT USER
  const fetchMe = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getMe();

      dispatch(setUser(data.user));
    } catch (error) {
      const message = error?.message || "Somthing went wrong";
      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // UPDATE PROFILE
  const updateUserProfile = async (formData) => {
    try {
      dispatch(setLoading(true));
      const data = await updateProfile(formData);

      dispatch(setUser(data.user));
      toast.success("Profile updated");

      return data;
    } catch (error) {
      handleError(error, "Update failed");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // LOGOUT
  const logoutUser = async () => {
    try {
      dispatch(setLoading(true));

      await logoutApi();

      dispatch(logoutAction());

      dispatch(clearCart());
      dispatch(clearWishlist());
      dispatch(clearAddresses());
      dispatch(clearSingleProduct());

      toast.success("Logged out successfully");
    } catch (error) {
      handleError(error, "Logout failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // RESEND VERIFICATION
  const resendVerificationMail = async (email) => {
    try {
      const data = await resendVerification(email);
      toast.success("Verification email sent");
      return data;
    } catch (error) {
      handleError(error, "Resend failed");
      throw error;
    }
  };

  return {
    registerUser,
    loginUser,
    fetchMe,
    updateUserProfile,
    logoutUser,
    resendVerificationMail,
  };
}

export default useAuth;
