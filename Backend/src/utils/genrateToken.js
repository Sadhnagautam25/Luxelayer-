import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export function genrateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, config.JWT_SECRET, {
    expiresIn: "2d",
  });
}


export default genrateToken;