import Product from "../models/product.model.js";
import sellerModel from "../models/seller.model.js";
import uploadFile from "../services/storage.service.js";

export const createProductController = async (req, res, next) => {
  try {
    const seller = req.seller;

    const { name, description, price, stock, category, currency, sizes } =
      req.body;

    // 🔹 Parse sizes (IMPORTANT for form-data)
    let parsedSizes = sizes;

    if (typeof sizes === "string") {
      parsedSizes = JSON.parse(sizes);
    }

    // 🔹 Validate stock vs sizes
    if (parsedSizes && parsedSizes.length > 0) {
      const totalSizeStock = parsedSizes.reduce(
        (sum, item) => sum + item.stock,
        0,
      );

      if (totalSizeStock !== Number(stock)) {
        return res.status(400).json({
          success: false,
          message: "Size stock must match total stock",
        });
      }
    }

    // 🔹 Images upload (ImageKit)
    let images = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
          folder: "/E-commerce_Platform/productsImages",
        }),
      );

      const uploadedImages = await Promise.all(uploadPromises);

      images = uploadedImages.map((img) => img.url);
    }

    const words = (name + " " + description + " " + category)
      .toLowerCase()
      .split(" ");

    let extraTags = [];

    if (words.includes("tshirt") || words.includes("t-shirt")) {
      extraTags.push("tee", "shirt", "tshirts", "t shirt");
    }

    if (words.includes("short") || words.includes("shorts")) {
      extraTags.push("short", "shorts");
    }

    if (words.includes("jean") || words.includes("jeans")) {
      extraTags.push("jean", "jeans", "denim");
    }

    if (words.includes("shoe") || words.includes("shoes")) {
      extraTags.push("shoe", "shoes", "footwear");
    }

    if (category === "women") {
      extraTags.push("girl", "ladies", "female", "womens");
    }

    if (category === "men") {
      extraTags.push("boy", "male", "mens");
    }

    const searchTags = [
      ...new Set([
        name.toLowerCase(),
        description.toLowerCase(),
        category,
        ...words,
        ...extraTags,
      ]),
    ];

    const product = await Product.create({
      seller: seller._id,
      name,
      description,
      price,
      stock,
      category,
      currency,
      sizes: parsedSizes || [],
      images,
      searchTags,
    });

    res.status(201).json({
      success: true,
      message: "Product created",
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductController = async (req, res, next) => {
  try {
    const seller = req.seller;
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ownership check
    if (product.seller.toString() !== seller._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can update only your product",
      });
    }

    const {
      name,
      description,
      price,
      stock,
      category,
      currency,
      sizes,
      oldImages,
    } = req.body;

    // ===============================
    // Parse Sizes
    // ===============================
    let parsedSizes = sizes;

    if (typeof parsedSizes === "string") {
      parsedSizes = JSON.parse(parsedSizes);
    }

    if (parsedSizes && Array.isArray(parsedSizes)) {
      const totalSizeStock = parsedSizes.reduce(
        (sum, item) => sum + Number(item.stock || 0),
        0,
      );

      if (stock !== undefined && Number(stock) !== totalSizeStock) {
        return res.status(400).json({
          success: false,
          message: "Size stock must match total stock",
        });
      }

      product.sizes = parsedSizes;
    }

    // ===============================
    // Fields Update
    // ===============================
    if (name !== undefined) product.name = name;

    if (description !== undefined) product.description = description;

    if (price !== undefined) product.price = Number(price);

    if (stock !== undefined) product.stock = Number(stock);

    if (category !== undefined) product.category = category;

    if (currency !== undefined) product.currency = currency;

    // ===============================
    // Images Update
    // ===============================

    let parsedOldImages = [];

    if (oldImages) {
      parsedOldImages =
        typeof oldImages === "string" ? JSON.parse(oldImages) : oldImages;
    }

    let newImages = [];

    if (req.files?.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
          folder: "/E-commerce_Platform/productsImages",
        }),
      );

      const uploaded = await Promise.all(uploadPromises);

      newImages = uploaded.map((img) => img.url);
    }

    // 🔥 FINAL IMAGES
    product.images = [...parsedOldImages, ...newImages];

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyProductsController = async (req, res, next) => {
  try {
    const seller = req.seller;

    const products = await Product.find({ seller: seller._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductController = async (req, res, next) => {
  try {
    const seller = req.seller;
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔴 ownership check
    if (product.seller.toString() !== seller._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your product",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleProductController = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate(
      "seller",
      "businessName email",
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔥 Similar Products Logic
    const similarProducts = await Product.find({
      _id: { $ne: product._id }, // exclude current product
      $or: [
        { category: product.category },
        { searchTags: { $in: product.searchTags } },
      ],
    }).limit(8);

    res.status(200).json({
      success: true,
      product,
      similarProducts,
    });
  } catch (error) {
    next(error);
  }
};

// all products fatches show in dashboard

export const getAllProductsController = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("seller", "businessName") // optional
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};
// mujhe isko update krna h Show me Pagination + Search + Filter (very important for real apps)
// and also implement RAG and embeddings and all

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({
      category: category,
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// search features add

export const searchProductsController = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    const products = await Product.find({
      searchTags: { $regex: keyword, $options: "i" },
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};
