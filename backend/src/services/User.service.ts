import { Types } from "mongoose";
import { enumType, IUser, specialty } from "../models/User.model";
import { UserRepository } from "../repositories/User.repository";
import { hashPassword } from "../utils/bcrypt/bcrypt.config";
import { RegisterType } from "../utils/schema/auth.schema";
import {
  dataRegisterJwt,
  generateJWTRegister,
  generateJWTEmail,
  dataEmailJwt,
  generateJWT,
} from "../utils/jwt/jwt.config";
import { Emails } from "../email/registerEmail";
import { UserUpdateType } from "../utils/schema/user.schema";
import { TradeService } from "./Trade.service";
import { TradeRepository } from "../repositories/Trade.repository";
import { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../config/cloudinary/cloudinary.config";
import { populate } from "dotenv";

export interface CloudinaryResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: Date;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder?: string; // Hacer opcional si no está siempre presente
  display_name?: string; // Hacer opcional si no está siempre presente
  access_mode: string;
  overwritten: boolean;
  original_filename: string;
  api_key: string;
}

type userFilterDataType = Pick<
  IUser,
  "id" | "name" | "aboutme" | "specialties" | "interests" | "userRatings"
> & {
  phoneNumber: string | null;
  trades: Types.ObjectId[] | null;
};

type userRating = {
  userId: Types.ObjectId;
  tradeId: string;
  comment: string;
  rating: enumType;
};

export class UserService {
  userRepository: UserRepository;
  tradeRepository: TradeRepository;

  constructor(
    userRepository: UserRepository,
    tradeRepository: TradeRepository
  ) {
    this.userRepository = userRepository;
    this.tradeRepository = tradeRepository;
  }

  // ta ok.👍
  async verifyEmail(user: RegisterType) {
    try {
      const userFound = await this.userRepository.findByEmail(user.email);
      if (userFound) {
        return {
          status: "failed",
          payload: "El correo ya esta registrado",
        };
      }
      const token = await generateJWTRegister(user);
      const data = {
        name: user.name,
        email: user.email,
        token: token,
      };
      Emails.sendConfirmationEmail(data);

      return {
        status: "success",
        payload: "Para terminar tu registro verifica tu email.",
      };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }

      throw new Error(String(error));
    }
  }
  async create(token: string) {
    try {
      const user = dataRegisterJwt(token);

      const userFound = await this.userRepository.findByEmail(user.email);

      if (userFound) {
        return {
          status: "failed",
          payload: "El correo ya esta registrado",
        };
      }
      user.password = await hashPassword(user.password);
      const newUser = await this.userRepository.create(user);

      const jwt = generateJWT({ id: newUser._id });

      const populatedUser = await newUser.populate([
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

      return {
        status: "success",
        payload: populatedUser,
        token: jwt,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }

      throw new Error(String(error));
    }
  }

  async resetEmail(email: string) {
    try {
      const userFound = await this.userRepository.findByEmail(email);

      if (!userFound) {
        return {
          status: "failed",
          payload: "El correo no esta registrado",
        };
      }

      const token = generateJWTEmail({ email });

      const data = {
        name: userFound.name,
        email: userFound.email,
        token: token,
      };
      Emails.sendResetPasswordEmail(data);

      return {
        status: "success",
        payload: "Para continuar el reset verifica tu email.",
      };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error(String(error));
    }
  }

  async updatePassword({
    token,
    password,
  }: {
    token: string;
    password: string;
  }) {
    try {
      const { email } = dataEmailJwt(token);

      const hashedPassword = await hashPassword(password);

      const updatedUser = await this.userRepository.updateByEmail(email, {
        password: hashedPassword,
      });

      return {
        status: "success",
        payload: updatedUser,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error(String(error));
    }
  }

  // ta ok.👍
  async find(categoryId: string | null, page: string | null) {
    const options = {
      page: page ? +page : 1,
      limit: 10,
      select: "name avatar aboutme specialties interests userRatings",
      populate: [
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
      ],
    };
    let query = {};
    if (categoryId) {
      query = {
        specialties: {
          $elemMatch: { categoryId: new Types.ObjectId(categoryId) },
        },
      };
    }
    try {
      const users = await this.userRepository.find(query, options);
      console.log(users);

      return {
        status: "success",
        payload: users,
      };
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }
      throw new Error(String(error));
    }
  }
  // ta ok.👍
  async findById(user: IUser | undefined, searchedUserId: string) {
    try {
      const userFind = await this.userRepository.findOnePopulated(
        searchedUserId
      );

      if (!userFind) {
        return {
          status: "error",
          payload: "Usuario no encontrado",
        };
      }

      let userFilterData: userFilterDataType = {
        id: userFind.id,
        name: userFind.name,
        aboutme: userFind.aboutme,
        specialties: userFind.specialties,
        interests: userFind.interests,
        userRatings: userFind.userRatings,
        trades: null,
        phoneNumber: null,
      };

      if (user) {
        if (user._id.toString() === userFind._id.toString()) {
          userFilterData.trades = userFind.trades;
          userFilterData.phoneNumber = userFind.phoneNumber;
        } else {
          const result = userFind.contacts.findIndex(
            (contact) => contact?.toString() === user.id.toString()
          );
          if (result !== -1) {
            userFilterData.phoneNumber = userFind.phoneNumber;
          }
        }
      }

      return {
        status: "success",
        payload: userFilterData,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error(String(error));
    }
  }

  async findByEmail(user: IUser | undefined, searchedUserEmail: string) {
    try {
      const userFind = await this.userRepository.findByEmail(searchedUserEmail);

      if (!userFind) {
        return {
          status: "failed",
          payload: "El correo no esta registrado",
        };
      }

      let userFilterData: userFilterDataType = {
        name: userFind.name,
        aboutme: userFind.aboutme,
        specialties: userFind.specialties,
        interests: userFind.interests,
        userRatings: userFind.userRatings,
        trades: userFind.trades,
        phoneNumber: null,
      };

      if (user) {
        const result = userFind.contacts.findIndex(
          (contact) => contact?.toString() === user.id.toString()
        );
        if (result !== -1) {
          userFilterData.phoneNumber = userFind.phoneNumber;
        }
      }

      return {
        status: "success",
        payload: userFilterData,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error(String(error));
    }
  }

  // ta ok.👍
  async update(id: string | Types.ObjectId, data: UserUpdateType) {
    try {
      const user = await this.userRepository.update(id, data);
      if (user) {
        return {
          status: "success",
          payload: user,
        };
      } else {
        return {
          status: "error",
          payload: "Usuario no encontrado",
        };
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }
      throw new Error(String(error));
    }
  }

  // ta ok.👍
  async delete(id: string) {
    try {
      const user = await this.userRepository.delete(id);
      if (user) {
        return {
          status: "success",
          payload: user,
        };
      } else {
        return {
          status: "error",
          payload: "Usuario no encontrado",
        };
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }
      throw new Error(String(error));
    }
  }

  async updateRating(data: userRating, user: IUser) {
    try {
      const userFound = await this.userRepository.findOnePopulated(user._id);
      if (!userFound)
        return { status: "error", payload: "Usuario no encontrado" };

      const trade = await this.tradeRepository.findOnePending(
        user._id,
        data.tradeId,
        {}
      );
      if (!trade) return { status: "error", payload: "Trade no encontrado" };
      if (trade.status !== "FINISHED")
        return {
          status: "error",
          payload: "El trade todavia no finalizo dijo juan.",
        };

      if (userFound.userRatings.length > 0) {
        const findIndex = userFound.userRatings.findIndex(
          (rating) => rating.tradeId === data.tradeId
        );

        if (findIndex !== -1)
          return {
            status: "error",
            payload: "Ya diste tu valoracion en este trade",
          };

        userFound.userRatings.push(data);

        const [resultUser, resultTrade] = await Promise.allSettled([
          userFound.save(),
          this.tradeRepository.updateStatusHasRated(trade.id, data.userId),
        ]);

        console.log(resultTrade);

        return {
          status: "success",
          payload: resultUser,
        };
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }
      throw new Error(String(error));
    }
  }
  async updatePick(user: IUser, photo: Express.Multer.File) {
    try {
      const uploadResult: CloudinaryResponse = await new Promise(
        (resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            {
              upload_preset: "tatrade_profile",
              public_id: `${user.email}`,
              use_filename: true,
              overwrite: true,
              transformation: [
                { width: 250, height: 250, gravity: "faces", crop: "thumb" },
                { radius: "max" },
              ],
            },
            (error, result: UploadApiResponse | undefined) => {
              if (error) return reject(error);
              resolve(result as unknown as CloudinaryResponse);
            }
          );
          uploadStream.end(photo.buffer);
        }
      );
      user.avatar = uploadResult!.url;
      await user.save();
      return { status: "success", payload: user };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }
}
