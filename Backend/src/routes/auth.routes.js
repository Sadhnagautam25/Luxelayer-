import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../Validators/auth.validator.js";
import {
  authGoogleCallback,
  getMeController,
  loginController,
  logoutController,
  registerController,
  resendVerificationEmail,
  updateProfileController,
  verifyEmailController,
} from "../controllers/auth.controller.js";
import upload from "../middlewares/upload.middleware.js";
import IdentifyUser from "../middlewares/auth.middleware.js";
import passport from "passport";
import { config } from "../config/config.js";

const authRouter = express.Router();
// authRouter prifix is => /api/auth

// register api 🔥
// method => POST
// api => /api/auth/register
// status code => 201

authRouter.post(
  "/register",
  upload.single("profile"),
  registerValidator,
  registerController,
);

// Login api 🔥
// method => POST
// api => /api/auth/login
// status code => 200

authRouter.post("/login", loginValidator, loginController);

// create getMe route 🔥
// api name => /api/auth/get-me
// api method => GET
// status => 200

authRouter.get("/get-me", IdentifyUser, getMeController);

// create update-profile route 🔥
// api name => /api/auth/update-profile
// api method => GET
// status => 200

authRouter.put(
  "/update-profile",
  upload.single("profile"),
  IdentifyUser,
  updateProfileController,
);

// Logout api 🔥
// method => GET
// api => /api/auth/logout
// status code => 200

authRouter.get("/logout", IdentifyUser, logoutController);

// verify email api🔥
// method => GET
// api => /api/auth/verify-email
// status code => 200

authRouter.get("/verify-email", verifyEmailController);

// resend-verification email api🔥
// method => POST
// api => /api/auth/resend-verification
// status code => 200

authRouter.post("/resend-verification", resendVerificationEmail);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

const failureUrl =
  config.NODE_ENV === "development" ? "http://localhost:5173/login" : "/login";

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: failureUrl,
  }),
  authGoogleCallback,
);

export default authRouter;
