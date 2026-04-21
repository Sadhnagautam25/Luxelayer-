import express from "express";
import IdentifyUser from "../middlewares/auth.middleware.js";
import {
  addAddress,
  deleteAddress,
  getMyAddresses,
  getSingleAddress,
  setDefaultAddress,
  updateAddress,
} from "../controllers/address.controller.js";
import upload from "../middlewares/upload.middleware.js";
import {
  addressValidator,
  updateAddressValidator,
} from "../Validators/address.validator.js";

const addressRouter = express.Router();
// addressRouter prifix is => /api/address

// Add Address
addressRouter.post(
  "/",
  IdentifyUser,
  upload.none(),
  addressValidator,
  addAddress,
);

// Get all addresses
addressRouter.get("/", IdentifyUser, getMyAddresses);

// Get single address
addressRouter.get("/:id", IdentifyUser, getSingleAddress);

// Update address
addressRouter.put(
  "/:id",
  IdentifyUser,
  upload.none(),
  updateAddressValidator,
  updateAddress,
);

// Delete address
addressRouter.delete("/:id", IdentifyUser, deleteAddress);

// Set default address
addressRouter.patch("/:id/default", IdentifyUser, setDefaultAddress);

export default addressRouter;
