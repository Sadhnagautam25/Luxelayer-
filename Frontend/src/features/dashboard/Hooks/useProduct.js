import { useDispatch } from "react-redux";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllMyProducts,
  getAllProductVeiwPublice,
  getMySingleProduct,
  getProductsByCategory,
} from "../services/sellerProduct.api.service";

import {
  setError,
  setLoading,
  setProducts,
  setMyProducts,
  setSingleProduct,
  setCategoryProducts,
  setSelectedCategory,
  clearSingleProduct,
  setSimilarProducts,
} from "../states/product.slice";

import toast from "react-hot-toast";

export function useProduct() {
  const dispatch = useDispatch();

  // 🔥 CREATE PRODUCT
  const handleCreateProduct = async (formData) => {
    try {
      dispatch(setLoading(true));

      const res = await createProduct(formData);

      dispatch(setMyProducts(res.product));

      toast.success("Product created successfully");

      return res.product;
    } catch (error) {
      dispatch(
        setError({
          message: error?.message || "Create product failed",
          detail: error?.detail || [],
        }),
      );

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔥 UPDATE PRODUCT
  const handleUpdateProduct = async (id, formData) => {
    try {
      dispatch(setLoading(true));

      const res = await updateProduct(formData, id);

      dispatch(setSingleProduct(res.product));

      toast.success("Product updated successfully");

      return res;
    } catch (error) {
      console.log(error);

      dispatch(
        setError({
          message: error?.message || "Update product failed",
          detail: error?.detail || [],
        }),
      );

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔥 DELETE PRODUCT
  const handleDeleteProduct = async (id) => {
    try {
      dispatch(setLoading(true));

      await deleteProduct(id);

      dispatch(clearSingleProduct());

      toast.success("Product deleted");

      return true;
    } catch (error) {
      dispatch(
        setError({
          message: error?.message || "Delete product failed",
          detail: error?.detail || [],
        }),
      );

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔥 GET MY PRODUCTS
  const handleGetMyProducts = async () => {
    try {
      dispatch(setLoading(true));

      const res = await getAllMyProducts();

      dispatch(setMyProducts(res.products));

      return res.products;
    } catch (error) {
      dispatch(
        setError({
          message: error?.message || "Fetch my products failed",
          detail: error?.detail || [],
        }),
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔥 GET SINGLE PRODUCT
  const handleGetSingleProduct = async (id) => {
    try {
      dispatch(setLoading(true));

      const res = await getMySingleProduct(id);

      dispatch(setSingleProduct(res.product));
      dispatch(setSimilarProducts(res.similarProducts));

      return res;
    } catch (error) {
      dispatch(
        setError({
          message: error?.message || "Fetch product failed",
          detail: error?.detail || [],
        }),
      );

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔥 GET ALL PRODUCTS
  const handleGetAllProducts = async () => {
    try {
      dispatch(setLoading(true));

      const res = await getAllProductVeiwPublice();

      dispatch(setProducts(res.products));

      return res.products;
    } catch (error) {
      dispatch(
        setError({
          message: error?.message || "Fetch products failed",
          detail: error?.detail || [],
        }),
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔥 CATEGORY PRODUCTS
  const handleCategoryProduct = async (category) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      dispatch(setSelectedCategory(category));

      const res = await getProductsByCategory(category);

      dispatch(setCategoryProducts(res.products));

      return res.products;
    } catch (error) {
      dispatch(setError(error?.message || "Failed to fetch products"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔥 CLEAR SINGLE PRODUCT
  const handleClearSingleProduct = () => {
    dispatch(clearSingleProduct());
  };

  return {
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleGetMyProducts,
    handleGetSingleProduct,
    handleGetAllProducts,
    handleCategoryProduct,
    handleClearSingleProduct,
  };
}

export default useProduct;
