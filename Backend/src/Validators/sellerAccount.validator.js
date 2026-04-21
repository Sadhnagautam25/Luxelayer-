import { body, validationResult } from "express-validator";

// 🔹 Error Handling Middleware
export const validateSeller = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Error");
    error.statusCode = 400;

    // clean structured errors
    error.detail = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return next(error); // 🔥 pass to global error middleware
  }

  next();
};

// 🔹 Validator
export const sellerValidator = [
  // 🔹 BUSINESS NAME
  body("businessName")
    .trim()
    .notEmpty()
    .withMessage("Business name is required")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Business name must be at least 2 characters"),

  // 🔹 DESCRIPTION
  body("businessDescription")
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  // 🔹 EMAIL
  body("contactEmail")
    .trim()
    .notEmpty()
    .withMessage("Contact email is required")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email address"),

  // 🔹 PHONE
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .bail()
    .matches(/^[0-9]{10,15}$/)
    .withMessage("Phone number must be 10 to 15 digits"),

  // 🔹 FILES
  body("logo").optional(),
  body("bannerImage").optional(),

  // 🔥 ADDRESS

  body("address.street")
    .trim()
    .notEmpty()
    .withMessage("Street is required")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Street must be at least 2 characters"),

  body("address.city")
    .trim()
    .notEmpty()
    .withMessage("City is required")
    .bail()
    .isLength({ min: 1 })
    .withMessage("City cannot be empty")
    .bail()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("City must contain only letters"),

  body("address.state")
    .trim()
    .notEmpty()
    .withMessage("State is required")
    .bail()
    .isLength({ min: 1 })
    .withMessage("State cannot be empty")
    .bail()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("State must contain only letters"),

  body("address.country")
    .trim()
    .notEmpty()
    .withMessage("Country is required")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Country cannot be empty"),

  body("address.zipCode")
    .trim()
    .notEmpty()
    .withMessage("Zip code is required")
    .bail()
    .matches(/^[0-9]{5,6}$/)
    .withMessage("Zip code must be 5 to 6 digits"),

  validateSeller,
];

export const updateSellerValidator = [
  // 🔹 Business Name
  body("businessName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Business name cannot be empty")
    .isLength({ min: 2 })
    .withMessage("Business name must be at least 2 characters"),

  // 🔹 Description
  body("businessDescription")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 to 500 characters"),

  // 🔹 Email
  body("contactEmail")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Enter a valid email"),

  // 🔹 Phone
  body("phone")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Phone cannot be empty")
    .matches(/^[0-9]{10,15}$/)
    .withMessage("Enter a valid phone number (10-15 digits)"),

  // 🔹 Images (optional but valid if provided)
  body("logo").optional().isURL().withMessage("Logo must be a valid URL"),

  body("bannerImage")
    .optional()
    .isURL()
    .withMessage("Banner must be a valid URL"),

  // 🔥 ADDRESS VALIDATION (IMPORTANT)
  body("address.street")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Street cannot be empty")
    .isLength({ min: 2 })
    .withMessage("Street must be at least 2 characters"),

  body("address.city")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("City cannot be empty")
    .isLength({ min: 1 })
    .withMessage("City must be at least 1 character")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("City must contain only letters"),

  body("address.state")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("State cannot be empty")
    .isLength({ min: 1 })
    .withMessage("State must be at least 1 character")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("State must contain only letters"),

  body("address.country")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Country cannot be empty")
    .isLength({ min: 1 })
    .withMessage("Country must be at least 1 character"),

  body("address.zipCode")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Zip code cannot be empty")
    .matches(/^[0-9]{5,6}$/)
    .withMessage("Enter a valid zip code (5-6 digits)"),

  validateSeller,
];
