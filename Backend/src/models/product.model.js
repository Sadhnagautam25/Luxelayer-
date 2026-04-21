import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      enum: ["INR", "USD", "EUR", "GBP", "AUD", "CAD"],
      uppercase: true,
      default: "INR",
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    sizes: [
      {
        size: {
          type: String,
          required: true,
        },
        stock: {
          type: Number,
          required: true,
        },
      },
    ],

    category: {
      type: String,
      enum: ["women", "men", "kids", "home_beauty"],
      required: true,
      lowercase: true,
    },

    searchTags: {
      type: [String],
      default: [],
    },
    
    images: {
      type: [String],
      validate: {
        validator: function (val) {
          return val.length <= 7;
        },
        message: "Maximum 7 images allowed",
      },
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
