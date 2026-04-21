import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// same user same product sirf ek baar
wishlistSchema.index({ user: 1, product: 1 }, { unique: true });

const wishlistModel = mongoose.model("Wishlist", wishlistSchema);

export default wishlistModel;
