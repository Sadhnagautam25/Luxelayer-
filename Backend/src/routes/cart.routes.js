import express from "express";
import IdentifyUser from "../middlewares/auth.middleware.js";
import {
  addToCartController,
  getCartController,
  increaseCartController,
  decreaseCartController,
  removeFromCartController,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

// ADD ITEM
cartRouter.post("/add-to-cart", IdentifyUser, addToCartController);

// GET CART
cartRouter.get("/my-cart", IdentifyUser, getCartController);

// INCREASE QTY
cartRouter.post("/increase", IdentifyUser, increaseCartController);

// DECREASE QTY
cartRouter.post("/decrease", IdentifyUser, decreaseCartController);

// REMOVE ITEM
cartRouter.delete("/remove/:productId", IdentifyUser, removeFromCartController);

export default cartRouter;
