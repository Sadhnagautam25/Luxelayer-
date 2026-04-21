import axios from "axios";

const sellerApi = axios.create({
  baseURL: "/api/seller",
  withCredentials: true,
});

export async function createBusinessAccount(formData) {
  try {
    const res = await sellerApi.post("/create-account", formData);
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}

export async function sellerGetMeDetail() {
  try {
    const res = await sellerApi.get("/me");
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}

export async function updateSellerAccount(formData) {
  try {
    const res = await sellerApi.put("/update-account", formData);
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}

export async function deleteSellerAccount() {
  try {
    const res = await sellerApi.delete("/delete-account");
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}
