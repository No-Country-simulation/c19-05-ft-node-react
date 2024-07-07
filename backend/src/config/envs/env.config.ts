/** @format */

import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	DATABASE_URL: get('DATABASE_URL').required().asString(),
	FRONTEND_URL: get('FRONTEND_URL').required().asString(),
	SMTP_HOST: get('SMTP_HOST').required().asString(),
	SMTP_PORT: get('SMTP_PORT').required().asPortNumber(),
	SMTP_USER: get('SMTP_USER').required().asString(),
	SMTP_PASS: get('SMTP_PASS').required().asString(),
	JWT_SECRET: get('JWT_SECRET').required().asString(),
	BCRYPT_SALT: get('BCRYPT_SALT').required().asInt(),
	COOKIE_SECRETKEY: get('COOKIE_SECRETKEY').required().asString(),
};
