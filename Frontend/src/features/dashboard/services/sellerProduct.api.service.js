import axios from "axios";

const productApi = axios.create({
  baseURL: "/api/product",
  withCredentials: true,
});

export async function createProduct(formData) {
  try {
    const res = await productApi.post("/create-product", formData);
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}

export async function updateProduct(formData, id) {
  try {
    const res = await productApi.put(`/update-product/${id}`, formData);
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}

export async function deleteProduct(id) {
  try {
    const res = await productApi.delete(`/delete-product/${id}`);
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}

export async function getAllMyProducts() {
  try {
    const res = await productApi.get("/my-products");
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}

export async function getMySingleProduct(id) {
  try {
    const res = await productApi.get(`/single/${id}`);
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}

export async function getAllProductVeiwPublice() {
  try {
    const res = await productApi.get("/all-products");
    return res.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}

export async function getProductsByCategory(category) {
  try {
    const res = await productApi.get(`/category/${category}`);

    return res.data;
  } catch (error) { 
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}
