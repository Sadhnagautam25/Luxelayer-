import express from "express";
import IdentifyUser from "../middlewares/auth.middleware.js";
import isSeller from "../middlewares/seller.middleware.js";
import createProductValidator, {
  updateProductValidator,
} from "../Validators/product.validator.js";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getMyProductsController,
  getProductsByCategory,
  getSingleProductController,
  searchProductsController,
  updateProductController,
} from "../controllers/Product.controller.js";
import upload from "../middlewares/upload.middleware.js";

const productRouter = express.Router();

// Create Product (Only Seller)

productRouter.post(
  "/create-product",
  IdentifyUser,
  isSeller,
  upload.array("images", 7),
  createProductValidator,
  createProductController,
);

//  Update Product (Only Owner Seller)

productRouter.put(
  "/update-product/:productId",
  IdentifyUser,
  isSeller,
  upload.array("images", 7),
  updateProductValidator,
  updateProductController,
);

//  Delete Product (Only Owner Seller)

productRouter.delete(
  "/delete-product/:productId",
  IdentifyUser,
  isSeller,
  deleteProductController,
);

// Get Seller's Own Products (Dashboard)

productRouter.get(
  "/my-products",
  IdentifyUser,
  isSeller,
  getMyProductsController,
);

// Get Single Product (Public)
productRouter.get("/single/:productId", getSingleProductController);

// Get All Products (Public / Buyer View)
productRouter.get("/all-products", getAllProductsController);

// get products using categories

productRouter.get("/category/:category", getProductsByCategory);

// search products route

productRouter.get("/search", searchProductsController);



export default productRouter;
