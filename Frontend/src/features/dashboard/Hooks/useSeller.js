import { useDispatch } from "react-redux";
import {
  createBusinessAccount,
  sellerGetMeDetail,
  updateSellerAccount,
  deleteSellerAccount,
} from "../services/sellerAccount.api.service";

import {
  setLoading,
  setSellerDetail,
  setError,
  clearSeller,
} from "../states/seller.slice";

import toast from "react-hot-toast";

export function useSeller() {
  const dispatch = useDispatch();

  // 🔹 Create Seller
  const handleCreateSellerAccount = async (formData) => {
    try {
      dispatch(setLoading(true));

      const data = await createBusinessAccount(formData);

      dispatch(setSellerDetail(data.data));
      dispatch(setError(null));

      toast.success("Business account created");

      return data.data;
    } catch (error) {
      dispatch(
        setError({
          message: error?.message || "Business account creation failed",
          detail: error?.detail || [],
        }),
      );

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔹 Get Seller Details
  const handleGetSellerDetail = async () => {
    try {
      dispatch(setLoading(true));

      const data = await sellerGetMeDetail();

      dispatch(setSellerDetail(data.data));

      return data.data;
    } catch (error) {
      dispatch(setError(error?.message || "Fetch seller details failed"));

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔹 Update Seller
  const handleUpdateSellerAccount = async (formData) => {
    try {
      dispatch(setLoading(true));

      const data = await updateSellerAccount(formData);

      dispatch(setSellerDetail(data.data));
      dispatch(setError(null));

      toast.success("Seller account updated");

      return data.data;
    } catch (error) {
      dispatch(
        setError({
          message: error?.message || "Update seller failed",
          detail: error?.detail || [],
        }),
      );

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔹 Delete Seller
  const handleDeleteSellerAccount = async () => {
    try {
      dispatch(setLoading(true));

      const res = await deleteSellerAccount();

      dispatch(clearSeller());

      toast.success("Seller account deleted ");

      return res;
    } catch (error) {
      dispatch(setError(error?.message || "Delete seller failed"));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleCreateSellerAccount,
    handleGetSellerDetail,
    handleUpdateSellerAccount,
    handleDeleteSellerAccount,
  };
}

export default useSeller;
