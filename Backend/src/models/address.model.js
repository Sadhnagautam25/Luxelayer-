import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    // 🔹 Reference to User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔹 Personal Details
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },

    // 🔹 Company (Optional)
    companyName: {
      type: String,
      trim: true,
      default: null,
    },

    // 🔹 Address Details
    country: {
      type: String,
      trim: true,
      default: null, // optional
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    streetAddress: {
      type: String,
      trim: true,
      default: null,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },

    zipCode: {
      type: String,
      required: [true, "Zip code is required"],
      trim: true,
    },

    // 🔹 Extra Features (E-commerce 🔥)
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const addressModel = mongoose.model("Address", addressSchema);

export default addressModel;