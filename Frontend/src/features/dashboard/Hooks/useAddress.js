import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setAddresses,
  setSingleAddress,
  setError,
  setSuccess,
  setMessage,
  clearAddressState,
} from "../states/address.slice.js";

import {
  createAddressApi,
  getMyAddressesApi,
  getSingleAddressApi,
  updateAddressApi,
  deleteAddressApi,
  setDefaultAddressApi,
} from "../services/userAddress.api.service.js";
import toast from "react-hot-toast";

const useAddress = () => {
  const dispatch = useDispatch();

  const { addresses, singleAddress, loading, error, success } = useSelector(
    (state) => state.address,
  );

  // ================= ERROR HANDLER =================
  const getErrorPayload = (err) => {
    return err?.detail?.length
      ? err.detail
      : err?.message || "Something went wrong";
  };

  // ================= RESET SUCCESS =================
  const resetSuccess = () => {
    setTimeout(() => {
      dispatch(setSuccess(false));
      dispatch(setMessage(null));
    }, 2000);
  };

  // ================= CREATE =================
  const handleCreateAddress = async (data) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const res = await createAddressApi(data);

      dispatch(setSuccess(true));
      dispatch(setMessage(res.message));

      toast.success(res.message || "Address created successfully");

      await fetchMyAddresses();
      resetSuccess();
    } catch (err) {
      const msg = err?.message || "Something went wrong";
      dispatch(setError(getErrorPayload(err)));
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ================= GET ALL =================
  const fetchMyAddresses = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const res = await getMyAddressesApi();

      dispatch(setAddresses(res.addresses));
    } catch (err) {
      dispatch(setError(getErrorPayload(err)));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ================= GET SINGLE =================
  const fetchSingleAddress = async (id) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const res = await getSingleAddressApi(id);

      dispatch(setSingleAddress(res.address));
    } catch (err) {
      dispatch(setError(getErrorPayload(err)));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ================= UPDATE =================
  const handleUpdateAddress = async (id, data) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const res = await updateAddressApi(id, data);

      dispatch(setSuccess(true));
      dispatch(setMessage(res.message));

      toast.success(res.message || "Address updated successfully");
      await fetchMyAddresses();
      resetSuccess();
    } catch (err) {
      const msg = err?.message || "Something went wrong";

      dispatch(setError(getErrorPayload(err)));
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ================= DELETE =================
  const handleDeleteAddress = async (id) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const res = await deleteAddressApi(id);

      dispatch(setSuccess(true));
      dispatch(setMessage(res.message));

      toast.success(res.message || "Address deleted");

      await fetchMyAddresses();
      resetSuccess();
    } catch (err) {
      const msg = err?.message || "Something went wrong";
      dispatch(setError(getErrorPayload(err)));
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ================= SET DEFAULT =================
  const handleSetDefaultAddress = async (id) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const res = await setDefaultAddressApi(id);

      dispatch(setSuccess(true));
      dispatch(setMessage(res.message));

      toast.success(res.message || "Default address set");

      await fetchMyAddresses();
      resetSuccess();
    } catch (err) {
      const msg = err?.message || "Something went wrong";
      dispatch(setError(getErrorPayload(err)));
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ================= RETURN =================
  return {
    addresses,
    singleAddress,
    loading,
    error,
    success,

    handleCreateAddress,
    fetchMyAddresses,
    fetchSingleAddress,
    handleUpdateAddress,
    handleDeleteAddress,
    handleSetDefaultAddress,

    clearAddressState: () => dispatch(clearAddressState()),
  };
};

export default useAddress;
