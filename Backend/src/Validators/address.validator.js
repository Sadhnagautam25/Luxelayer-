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

export const addressValidator = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),

  body("email").trim().isEmail().withMessage("Valid email is required"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone must be 10 digits"),

  body("address").trim().notEmpty().withMessage("Address is required"),

  body("city").trim().notEmpty().withMessage("City is required"),

  body("state").trim().notEmpty().withMessage("State is required"),

  body("zipCode").trim().notEmpty().withMessage("Zip code is required"),

  validate,
];

export const updateAddressValidator = [
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("phone")
    .optional()
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone must be 10 digits"),

  body("address")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Address cannot be empty"),

  body("city").optional().trim().notEmpty().withMessage("City cannot be empty"),

  body("state")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("State cannot be empty"),

  body("zipCode")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Zip code cannot be empty"),

  validate,
];
