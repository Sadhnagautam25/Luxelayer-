import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    // 🔗 Reference to User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one user = one seller profile
    },

    // 🏢 Business Name
    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    // 📝 Description
    businessDescription: {
      type: String,
      required: true,
      maxlength: 500,
    },

    // 🖼️ Logo Image
    logo: {
      type: String, // URL
      default: "",
    },

    // 🖼️ Banner Image (optional)
    bannerImage: {
      type: String,
      default: "",
    },

    // 📧 Contact Email
    contactEmail: {
      type: String,
      required: true,
      lowercase: true,
    },

    // 📞 Phone Number
    phone: {
      type: String,
      required: true,
    },

    // 📍 Address (structured)
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zipCode: { type: String },
    },
  },
  {
    timestamps: true, // ✅ automatically adds createdAt & updatedAt
  },
);

const sellerModel = mongoose.model("Seller", sellerSchema);

export default sellerModel;
