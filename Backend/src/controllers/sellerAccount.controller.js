import sellerModel from "../models/seller.model.js";
import userModel from "../models/user.model.js";
import uploadFile from "../services/storage.service.js"; // tumhara ImageKit service

export async function sellerCreateAccountController(req, res, next) {
  try {
    const userId = req.user.id;

    // 🔥 SAFE ADDRESS PARSE (VERY IMPORTANT)
    if (req.body.address && typeof req.body.address === "string") {
      try {
        req.body.address = JSON.parse(req.body.address);
      } catch (err) {
        return res.status(400).json({
          message: "Invalid address format",
          detail: [],
        });
      }
    }

    const { businessName, businessDescription, contactEmail, phone, address } =
      req.body;

    // 🔹 Ensure address exists
    if (!address || typeof address !== "object") {
      return res.status(400).json({
        message: "Address is required",
        detail: [],
      });
    }

    // 🔹 Check if seller already exists
    const sellerAlreadyExists = await sellerModel.findOne({ user: userId });

    if (sellerAlreadyExists) {
      return res.status(409).json({
        message: "Seller account already created",
        detail: [],
      });
    }

    // 🔹 Image handling
    let logoUrl = "";
    let bannerUrl = "";

    if (req.files?.logo?.[0]) {
      const file = req.files.logo[0];

      const uploadedLogo = await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
        folder: "E-commerce_Platform/sellerAccount/logos",
      });

      logoUrl = uploadedLogo.url;
    }

    if (req.files?.bannerImage?.[0]) {
      const file = req.files.bannerImage[0];

      const uploadedBanner = await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
        folder: "E-commerce_Platform/sellerAccount/banners",
      });

      bannerUrl = uploadedBanner.url;
    }

    // 🔹 Create seller
    const seller = await sellerModel.create({
      user: userId,
      businessName,
      businessDescription,
      contactEmail,
      phone,
      address,
      logo: logoUrl,
      bannerImage: bannerUrl,
    });

    // 🔹 Update user role
    await userModel.findByIdAndUpdate(userId, {
      role: "seller",
    });

    // 🔹 Response
    res.status(201).json({
      success: true,
      message: "Seller account created successfully",
      data: seller,
    });
  } catch (error) {
    next(error);
  }
}
export async function getSellerMeDetails(req, res, next) {
  try {
    const userId = req.user.id;

    const sellerDetail = await sellerModel.findOne({ user: userId });

    if (!sellerDetail) {
      const error = new Error(
        "Seller account not found. Please create one first.",
      );
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Fetch seller details successfully",
      data: sellerDetail,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateSellerDetailController(req, res, next) {
  try {
    const userId = req.user.id;

    // 🔹 Find seller
    const seller = await sellerModel.findOne({ user: userId });

    if (!seller) {
      const error = new Error("Seller account not found");
      error.statusCode = 404;
      return next(error);
    }

    // 🔹 Extract fields
    let { businessName, businessDescription, contactEmail, phone } = req.body;

    // 🔹 Trim values (important)
    businessName = businessName?.trim();
    businessDescription = businessDescription?.trim();
    contactEmail = contactEmail?.trim();
    phone = phone?.trim();

    // 🔹 Safe parse address
    let parsedAddress;
    if (req.body.address) {
      try {
        parsedAddress = JSON.parse(req.body.address);
      } catch (err) {
        const error = new Error("Invalid address format");
        error.statusCode = 400;
        return next(error);
      }
    }

    // 🔹 Handle images (keep old if not updated)
    let logoUrl = seller.logo;
    let bannerUrl = seller.bannerImage;

    if (req.files?.logo?.[0]) {
      const file = req.files.logo[0];

      const uploadedLogo = await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
        folder: "E-commerce_Platform/sellerAccount/logos",
      });

      logoUrl = uploadedLogo.url;
    }

    if (req.files?.bannerImage?.[0]) {
      const file = req.files.bannerImage[0];

      const uploadedBanner = await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
        folder: "E-commerce_Platform/sellerAccount/banners",
      });

      bannerUrl = uploadedBanner.url;
    }

    // 🔥 UPDATE LOGIC (SMART)

    if (businessName) seller.businessName = businessName;
    if (businessDescription) seller.businessDescription = businessDescription;
    if (contactEmail) seller.contactEmail = contactEmail;
    if (phone) seller.phone = phone;

    // 🔥 Address merge (important)
    if (parsedAddress) {
      seller.address = {
        ...seller.address.toObject(), // old data
        ...parsedAddress, // new data overwrite
      };
    }

    // 🔹 Update images
    seller.logo = logoUrl;
    seller.bannerImage = bannerUrl;

    // 🔹 Save
    await seller.save();

    // 🔹 Response
    res.status(200).json({
      success: true,
      message: "Seller account updated successfully",
      data: seller,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteSellerAccountController(req, res, next) {
  try {
    const userId = req.user.id;

    // 🔹 Find seller
    const seller = await sellerModel.findOne({ user: userId });

    if (!seller) {
      const error = new Error("Seller account not found");
      error.statusCode = 404;
      return next(error);
    }

    // 🔹 Delete seller account
    await sellerModel.deleteOne({ user: userId });

    // 🔹 Convert role back to user
    await userModel.findByIdAndUpdate(userId, {
      role: "user",
    });

    // 🔹 Response
    res.status(200).json({
      success: true,
      message: "Seller account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
