import express from "express";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./config/config.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "..", "public")));

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_OAUTH.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_OAUTH.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

import authRouter from "./routes/auth.routes.js";
import addressRouter from "./routes/address.routes.js";
import sellerRouter from "./routes/seller.routes.js";
import productRouter from "./routes/product.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import cartRouter from "./routes/cart.routes.js";

app.use("/api/auth", authRouter);
app.use("/api/address", addressRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/cart", cartRouter);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(errorMiddleware);
export default app;
