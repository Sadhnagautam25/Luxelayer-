import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

if (
  !process.env.IMAGEKIT_PUBLIC_KEY ||
  !process.env.IMAGEKIT_PRIVATE_KEY ||
  !process.env.IMAGEKIT_URL_ENDPOINT
) {
  throw new Error("ImageKit env variables are missing");
}

if (!process.env.BREVO_API_KEY) {
  throw new Error("BREVO_API_KEY is not defined");
}

if (!process.env.SENDER_EMAIL) {
  throw new Error("SENDER_EMAIL is missing");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET KEY is missing");
}

if (!process.env.BASE_URL) {
  throw new Error("BASE_URL is missing");
}

if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is missing");
}

if (
  !process.env.REDIS_HOST ||
  !process.env.REDIS_PORT ||
  !process.env.REDIS_PASSWORD
) {
  throw new Error("REDIS env variables are missing");
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID env variable is missing");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_SECRET env variable is missing");
}

if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV env variable is missing");
}

export const config = {
  MONGO_URI: process.env.MONGO_URI,

  IMAGEKIT: {
    PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
  },

  EMAIL: {
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    SENDER_EMAIL: process.env.SENDER_EMAIL,
  },

  JWT_SECRET: process.env.JWT_SECRET,
  BASE_URL: process.env.BASE_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,

  REDIS: {
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  },

  GOOGLE_OAUTH: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },

  NODE_ENV: process.env.NODE_ENV,
};
