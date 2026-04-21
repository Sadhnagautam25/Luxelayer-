import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCartController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const { product, size, name, price, image, quantity = 1 } = req.body;

    // 🔥 1. Get product from DB
    const dbProduct = await Product.findById(product);

    if (!dbProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔥 2. Check stock
    if (dbProduct.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });
    }

    // 🔥 3. Find cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [
          {
            product,
            name,
            price,
            image,
            size,
            quantity,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === product && item.size === size,
      );

      if (existingItem) {
        if (existingItem.quantity + quantity > dbProduct.stock) {
          return res.status(400).json({
            success: false,
            message: "Cannot add more than available stock",
          });
        }

        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          product,
          name,
          price,
          image,
          size,
          quantity,
        });
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Added to cart safely",
      cart,
    });
  } catch (error) {
    next(error);
  }
};
export const getCartController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const increaseCartController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, size } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const item = cart.items.find(
      (i) => i.product.toString() === productId && i.size === size,
    );

    if (!item) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    // 🔥 STOCK CHECK
    if (item.quantity + 1 > product.stock) {
      return res.status(400).json({
        message: "Not enough stock available",
      });
    }

    item.quantity += 1;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Quantity increased",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const decreaseCartController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, size } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (i) => i.product.toString() === productId && i.size === size,
    );

    if (!item) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    item.quantity -= 1;

    // 🔥 AUTO REMOVE IF 0
    cart.items = cart.items.filter((i) => i.quantity > 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Quantity decreased",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCartController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const { productId } = req.params; // ✅ from URL
    const { size } = req.body; // ✅ from body

    if (!productId || !size) {
      return res.status(400).json({
        success: false,
        message: "productId or size missing",
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // 🔥 remove ONLY matching product + size
    cart.items = cart.items.filter(
      (item) => !(item.product.toString() === productId && item.size === size),
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};
