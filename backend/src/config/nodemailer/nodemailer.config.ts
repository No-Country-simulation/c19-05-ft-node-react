/** @format */

import nodemailer from "nodemailer";
import { envs } from "../envs/env.config";

const config = () => {
  return {
    host: envs.SMTP_HOST,
    port: envs.SMTP_PORT,
    secure: envs.SMTP_PORT === 465 ? true : false,
    auth: {
      user: envs.SMTP_USER,
      pass: envs.SMTP_PASS,
    },
  };
};

export const transport = nodemailer.createTransport(config());
