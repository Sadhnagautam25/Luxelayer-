import { body, validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Error");
    error.statusCode = 400;
    error.detail = errors.array();
    return next(error);
  }

  next();
};

/* ------------------------------------------------------- */
/* CREATE PRODUCT VALIDATOR */
/* ------------------------------------------------------- */

export const createProductValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .bail()
    .isNumeric()
    .withMessage("Price must be a number")
    .bail()
    .custom((value) => Number(value) > 0)
    .withMessage("Price must be greater than 0"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stock must be 0 or more"),

  /* 🔥 Sizes Validation */
  body("sizes")
    .optional()
    .custom((value) => {
      let sizes = value;

      if (typeof value === "string") {
        try {
          sizes = JSON.parse(value);
        } catch (error) {
          throw new Error("Sizes must be valid JSON");
        }
      }

      if (!Array.isArray(sizes)) {
        throw new Error("Sizes must be an array");
      }

      if (sizes.length > 10) {
        throw new Error("Max 10 sizes allowed");
      }

      sizes.forEach((item) => {
        if (!item.size || typeof item.size !== "string") {
          throw new Error("Each size must have valid size name");
        }

        if (
          item.stock === undefined ||
          isNaN(item.stock) ||
          Number(item.stock) < 0
        ) {
          throw new Error("Each size must have valid stock");
        }
      });

      return true;
    }),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),

  body("currency")
    .optional()
    .isIn(["INR", "USD", "EUR", "GBP", "AUD", "CAD"])
    .withMessage("Invalid currency"),

  validate,
];

/* ------------------------------------------------------- */
/* UPDATE PRODUCT VALIDATOR */
/* ------------------------------------------------------- */

export const updateProductValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number")
    .bail()
    .custom((value) => Number(value) > 0)
    .withMessage("Price must be greater than 0"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be 0 or more")
    .bail()
    .custom((value, { req }) => {
      let sizes = req.body.sizes;

      // agar sizes aaye hain to parse karo
      if (sizes) {
        if (typeof sizes === "string") {
          try {
            sizes = JSON.parse(sizes);
          } catch (error) {
            return true; // sizes validator alag handle karega
          }
        }

        if (Array.isArray(sizes)) {
          const totalSizeStock = sizes.reduce(
            (sum, item) => sum + Number(item.stock || 0),
            0,
          );

          if (Number(value) !== totalSizeStock) {
            throw new Error("Total stock must match all sizes stock count");
          }
        }
      }

      return true;
    }),

  /* 🔥 Sizes Validation */
  body("sizes")
    .optional()
    .custom((value) => {
      let sizes = value;

      if (typeof value === "string") {
        try {
          sizes = JSON.parse(value);
        } catch (error) {
          throw new Error("Sizes must be valid JSON");
        }
      }

      if (!Array.isArray(sizes)) {
        throw new Error("Sizes must be an array");
      }

      if (sizes.length > 10) {
        throw new Error("Max 10 sizes allowed");
      }

      sizes.forEach((item) => {
        if (!item.size || typeof item.size !== "string") {
          throw new Error("Each size must have valid size name");
        }

        if (
          item.stock === undefined ||
          isNaN(item.stock) ||
          Number(item.stock) < 0
        ) {
          throw new Error("Each size must have valid stock");
        }
      });

      return true;
    }),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),

  body("currency")
    .optional()
    .isIn(["INR", "USD", "EUR", "GBP", "AUD", "CAD"])
    .withMessage("Invalid currency"),

  validate,
];

export default createProductValidator;
