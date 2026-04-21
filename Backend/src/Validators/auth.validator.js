import { body, validationResult } from "express-validator";

// 🔹 Validation Result Middleware
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

// 🔹 Register Validator
export const registerValidator = [
  body("FirstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .bail() // ✅ stop here if empty
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters"),

  body("Lastname")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),

  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Must contain at least 1 uppercase letter")
    .bail()
    .matches(/[0-9]/)
    .withMessage("Must contain at least 1 number"),

  validate,
];
// 🔹 Login Validator
export const loginValidator = [
  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email"),

  body("password").trim().notEmpty().withMessage("Password is required"),

  validate,
];
