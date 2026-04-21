import wishlistModel from "../models/wishlist.model.js";

export const productLikeController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const existingWishlist = await wishlistModel.findOne({
      user: userId,
      product: productId,
    });

    // already liked -> remove
    if (existingWishlist) {
      await existingWishlist.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Product removed from wishlist",
      });
    }

    // not liked -> add
    await wishlistModel.create({
      user: userId,
      product: productId,
    });

    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllWishlistProductsController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const wishlistProducts = await wishlistModel
      .find({ user: userId })
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: wishlistProducts.length,
      wishlistProducts,
    });
  } catch (error) {
    next(error);
  }
};
