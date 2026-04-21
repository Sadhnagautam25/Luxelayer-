import axios from "axios";

const addressApi = axios.create({
  baseURL: "/api/address",
  withCredentials: true,
});

export const createAddressApi = async (formData) => {
  try {
    const res = await addressApi.post("/", formData);
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
};

export const getMyAddressesApi = async () => {
  try {
    const res = await addressApi.get("/");
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
};

export const getSingleAddressApi = async (id) => {
  try {
    const res = await addressApi.get(`/${id}`);
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
};

export const updateAddressApi = async (id, formData) => {
  try {
    const res = await addressApi.put(`/${id}`, formData);
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
};

export const deleteAddressApi = async (id) => {
  try {
    const res = await addressApi.delete(`/${id}`);
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
};

export const setDefaultAddressApi = async (id) => {
  try {
    const res = await addressApi.patch(`/${id}/default`);
    return res.data;
  } catch (error) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};
