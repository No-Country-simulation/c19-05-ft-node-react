/** @format */

import { UserRepository } from "../repositories/User.repository";
import { comparePassword } from "../utils/bcrypt/bcrypt.config";
import { generateJWT } from "../utils/jwt/jwt.config";
import { LoginType } from "../utils/schema/auth.schema";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { AuthenticationError } from "../utils/errors/AuthenticationError";

export class AuthService {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async login(data: LoginType) {
    try {
      const user = await this.userRepository.findByEmail(data.email);

      if (!user || user.provider !== "local") {
        throw new AuthenticationError("The user does not exist.");
      }
      const isValid = await comparePassword(data.password, user.password);
      if (!isValid) {
        throw new BadRequestError("The password is incorrect.");
      }

      const populatedUser = await user.populate([
        {
          path: "specialties",
          populate: [
            {
              path: "categoryId",
              select: "name",
              model: "Category",
            },
            {
              path: "specialtyId",
              select: "name",
              model: "Specialty",
            },
          ],
        },
        {
          path: "interests",
          populate: [
            {
              path: "categoryId",
              select: "name",
              model: "Category",
            },
            {
              path: "specialtyId",
              select: "name",
              model: "Specialty",
            },
          ],
        },
        {
          path: "userRatings",
          populate: {
            path: "userId",
            select: "name avatar",
          },
        },
      ]);

      const token = generateJWT({ id: user.id });

      return {
        status: "success",
        payload: populatedUser,
        token: token,
      };
    } catch (error) {
      throw error;
    }
  }

  async loginGoogle(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user || user.provider !== "google") {
        throw new AuthenticationError("The user does not exist.");
      }

      const populatedUser = await user.populate([
        {
          path: "specialties",
          populate: [
            {
              path: "categoryId",
              select: "name",
              model: "Category",
            },
            {
              path: "specialtyId",
              select: "name",
              model: "Specialty",
            },
          ],
        },
        {
          path: "interests",
          populate: [
            {
              path: "categoryId",
              select: "name",
              model: "Category",
            },
            {
              path: "specialtyId",
              select: "name",
              model: "Specialty",
            },
          ],
        },
        {
          path: "userRatings",
          populate: {
            path: "userId",
            select: "name avatar",
          },
        },
      ]);

      const token = generateJWT({ id: user.id });

      return {
        status: "success",
        payload: populatedUser,
      };
    } catch (error) {
      throw error;
    }
  }
}
