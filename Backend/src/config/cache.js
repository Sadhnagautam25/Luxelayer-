import Redis from "ioredis";
import { config } from "../config/config.js";

export const redis = new Redis({
  host: config.REDIS.REDIS_HOST,
  port: config.REDIS.REDIS_PORT,
  password: config.REDIS.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("Server is connect to Redis");
});

redis.on("error", (err) => {
  console.log("error:", err);
});


export default redis;