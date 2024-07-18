import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  DATABASE_URL: get("DATABASE_URL").required().asString(),
  FRONTEND_URL: get("FRONTEND_URL").required().asString(),
  SMTP_HOST: get("SMTP_HOST").required().asString(),
  SMTP_PORT: get("SMTP_PORT").required().asPortNumber(),
  SMTP_USER: get("SMTP_USER").required().asString(),
  SMTP_PASS: get("SMTP_PASS").required().asString(),
  JWT_SECRET: get("JWT_SECRET").required().asString(),
  BCRYPT_SALT: get("BCRYPT_SALT").required().asInt(),
  COOKIE_SECRETKEY: get("COOKIE_SECRETKEY").required().asString(),
  GOOGLE_CLIENT_ID: get("GOOGLE_CLIENT_ID").required().asString(),
  GOOGLE_CLIENT_SECRET: get("GOOGLE_CLIENT_SECRET").required().asString(),
  GOOGLE_CALLBACK_URL: get("GOOGLE_CALLBACK_URL").required().asString(),
  SERVER_URL: get("SERVER_URL").required().asString(),
  CLOUDINARY_URL: get("CLOUDINARY_URL").required().asString(),
  CLOUDINARY_NAME: get("CLOUDINARY_NAME").required().asString(),
  CLOUDINARY_KEY: get("CLOUDINARY_KEY").required().asString(),
  CLOUDINARY_SECRET: get("CLOUDINARY_SECRET").required().asString(),
};
