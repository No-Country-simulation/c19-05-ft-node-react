/** @format */

import bcrypt from "bcrypt";

const saltRounds: number = 10;

export const hashPassword = async (password: string): Promise<string> => {
	try {
		const salt = await bcrypt.genSalt(saltRounds);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	} catch (error) {
		throw new Error("Error al hashear la pw");
	}
};

export const comparePassword = async (password: string, passwordHashed: string): Promise<boolean> => {
	try {
		return await bcrypt.compare(password, passwordHashed);
	} catch (error) {
		throw new Error("Hubo un error al comparar las pw");
	}
};
