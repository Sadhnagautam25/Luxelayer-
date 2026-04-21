import express from "express";
import IdentifyUser from "../middlewares/auth.middleware.js";
import { getAllWishlistProductsController, productLikeController } from "../controllers/wishlist.controller.js";

const wishlistRouter = express.Router();

// wishlistRouter prifix => /api/wishlist

wishlistRouter.post("/toggle/:id", IdentifyUser, productLikeController);

wishlistRouter.get("/all", IdentifyUser, getAllWishlistProductsController);

export default wishlistRouter;
