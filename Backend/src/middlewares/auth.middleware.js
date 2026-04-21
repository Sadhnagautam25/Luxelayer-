import redis from "../config/cache.js";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export async function IdentifyUser(req, res, next) {
  try {
    const { token } = req.cookies;

    // 1️⃣ token exist check
    if (!token) {
      const error = new Error("Authentication token missing");
      error.statusCode = 401;
      return next(error);
    }

    const isTokenBlacklisted = await redis.get(token);

    if (isTokenBlacklisted) {
      const error = new Error("Token Invalid");
      error.statusCode = 401;
      return next(error);
    }

    // 2️⃣ token verify
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // 3️⃣ user find
    const user = await userModel.findById(decoded.id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      return next(error);
    }

    // 4️⃣ user attach to request
    req.user = user;
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
}

export default IdentifyUser;
