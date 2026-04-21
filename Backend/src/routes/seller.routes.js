import express from "express";
import {
  sellerValidator,
  updateSellerValidator,
} from "../Validators/sellerAccount.validator.js";
import IdentifyUser from "../middlewares/auth.middleware.js";
import {
  deleteSellerAccountController,
  getSellerMeDetails,
  sellerCreateAccountController,
  updateSellerDetailController,
} from "../controllers/sellerAccount.controller.js";
import upload from "../middlewares/upload.middleware.js";

const sellerRouter = express.Router();

// sellerRouter prifix is => /api/seller 1️⃣

sellerRouter.post(
  "/create-account",
  IdentifyUser,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
  ]),
  sellerValidator,
  sellerCreateAccountController,
);

// Get Seller Profile (Fetch API) 2️⃣

sellerRouter.get("/me", IdentifyUser, getSellerMeDetails);

// Update Seller Account API 3️⃣

sellerRouter.put(
  "/update-account",
  IdentifyUser,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
  ]),
  updateSellerValidator,
  updateSellerDetailController,
);

// Route for Delete API 4️⃣

sellerRouter.delete(
  "/delete-account",
  IdentifyUser,
  deleteSellerAccountController,
);

export default sellerRouter;
