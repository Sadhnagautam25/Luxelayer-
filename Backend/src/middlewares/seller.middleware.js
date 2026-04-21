import sellerModel from "../models/seller.model.js";

export const isSeller = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const seller = await sellerModel.findOne({ user: userId });

    if (!seller) {
      return res.status(403).json({
        success: false,
        message: "Only seller can access this route",
      });
    }

    // optional: seller ko req me attach kar do
    req.seller = seller;

    next();
  } catch (error) {
    next(error);
  }
};

export default isSeller;
