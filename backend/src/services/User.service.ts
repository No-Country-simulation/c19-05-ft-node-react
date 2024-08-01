import { Types } from "mongoose";
import { enumType, IUser, specialty } from "../models/User.model";
import { UserRepository } from "../repositories/User.repository";
import { TradeRepository } from "../repositories/Trade.repository";
import { RegistrationTokenRepository } from "../repositories/RegistrationToken";
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
import { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../config/cloudinary/cloudinary.config";

import { AuthenticationError } from "../utils/errors/AuthenticationError";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { AuthorizationError } from "../utils/errors/AuthorizationError";

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

type userFilterDataTypeGetUserById = Pick<
  IUser,
  "id" | "name" | "aboutme" | "specialties" | "interests" | "userRatings"
> & {
  phoneNumber: string | null;
  trades: Types.ObjectId[] | null;
  avatar: string | null;
  banner: string | null;
  email: string | null;
  isOwnProfile: boolean;
};

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
  registrationToken: RegistrationTokenRepository;

  constructor(
    userRepository: UserRepository,
    tradeRepository: TradeRepository,
    registrationToken: RegistrationTokenRepository
  ) {
    this.userRepository = userRepository;
    this.tradeRepository = tradeRepository;
    this.registrationToken = registrationToken;
  }

  // ta ok.👍
  async verifyEmail(user: RegisterType) {
    try {
      const userFound = await this.userRepository.findByEmail(user.email);
      if (userFound) {
        throw new AuthorizationError("The email is already registered.");
      }

      const tokenFound = await this.registrationToken.findByEmail(user.email);
      if (tokenFound) {
        throw new AuthorizationError(
          "A registration request has already been sent for this email address. Please check your email or try again later."
        );
      }

      const token = generateJWTRegister(user);
      const data = {
        name: user.name,
        email: user.email,
        token: token,
      };

      await this.registrationToken.create(user.email);

      Emails.sendConfirmationEmail(data);

      return {
        status: "success",
        payload: "Para terminar tu registro verifica tu email.",
      };
    } catch (error) {
      throw error;
    }
  }
  async create(token: string) {
    try {
      const user = dataRegisterJwt(token);

      const userFound = await this.userRepository.findByEmail(user.email);

      if (userFound) {
        throw new AuthorizationError("The email is already registered.");
      }
      user.password = await hashPassword(user.password);
      const newUser = await this.userRepository.create(user);

      await this.registrationToken.deleteByEmail(newUser.email);

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
      throw error;
    }
  }

  async resetEmail(email: string) {
    try {
      const userFound = await this.userRepository.findByEmail(email);

      if (!userFound) {
        throw new AuthorizationError("The email is not registered.");
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
      throw error;
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
      throw error;
    }
  }

  // ta ok.👍
  async find(
    categoryId: string | null,
    page: string | null,
    userEmail: string | null
  ) {
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
    let query: any = {};
    if (categoryId) {
      query.specialties = {
        $elemMatch: { categoryId: new Types.ObjectId(categoryId) },
      };
    }
    if (userEmail) {
      query.email = { $ne: userEmail };
    }
    try {
      const users = await this.userRepository.find(query, options);
      return {
        status: "success",
        payload: users,
      };
    } catch (error: any) {
      throw error;
    }
  }
  // ta ok.👍
  async findById(user: IUser | undefined, searchedUserId: string) {
    try {
      const userFind = await this.userRepository.findOnePopulated(
        searchedUserId
      );

      if (!userFind) {
        throw new AuthenticationError("The user does not exist.");
      }

      let userFilterData: userFilterDataTypeGetUserById = {
        id: userFind.id,
        avatar: userFind.avatar,
        banner: userFind.banner,
        name: userFind.name,
        aboutme: userFind.aboutme,
        specialties: userFind.specialties,
        interests: userFind.interests,
        userRatings: userFind.userRatings,
        trades: null,
        phoneNumber: null,
        email: null,
        isOwnProfile: false, // Nuevo campo para indicar si es el perfil propio
      };

      if (user) {
        if (user._id.toString() === userFind._id.toString()) {
          userFilterData.trades = userFind.trades;
          userFilterData.phoneNumber = userFind.phoneNumber;
          userFilterData.email = userFind.email;
          userFilterData.isOwnProfile = true; // Actualizar el campo si es el perfil propio
        } else {
          const result = userFind.contacts.findIndex(
            (contact) => contact?.toString() === user.id.toString()
          );
          if (result !== -1) {
            userFilterData.phoneNumber = userFind.phoneNumber;
            userFilterData.email = userFind.email;
          }
        }
      }

      return {
        status: "success",
        payload: userFilterData,
      };
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(user: IUser | undefined, searchedUserEmail: string) {
    try {
      const userFind = await this.userRepository.findByEmail(searchedUserEmail);

      if (!userFind) {
        throw new AuthenticationError("The email is not registered.");
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
      throw error;
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
        throw new AuthenticationError("The user does not exist.");
      }
    } catch (error) {
      throw error;
    }
  }

  // ta ok.👍
  async delete(id: string) {
    try {
      const user = await this.userRepository.delete(id);
      if (!user) {
        throw new AuthenticationError("The user does not exist.");
      }
      return {
        status: "success",
        payload: user,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateRating(data: userRating, user: IUser, userTwoId: string) {
    try {
      const userFound = await this.userRepository.findOne(userTwoId);

      // if user not found
      if (!userFound) {
        throw new AuthenticationError("The user does not exist.");
      }
      const tradeFound = await this.tradeRepository.findOneNoPopulated(
        user._id,
        data.tradeId
      );

      // if trade not found
      if (!tradeFound) {
        throw new BadRequestError("The trade does not exist.");
      }
      // if the user already has a rating
      if (userFound.userRatings.length > 0) {
        const findIndex = userFound.userRatings.findIndex(
          (rating) => rating.tradeId === data.tradeId
        );

        if (findIndex !== -1) {
          throw new AuthorizationError("You have already rated this trade.");
        }
      }

      // if the trade is not yet finished
      if (tradeFound.status !== "FINISHED") {
        throw new AuthorizationError("The trade has not yet finished.");
      }

      //check that the user who sent the comment has not done it before.
      const isUserMemberOne =
        tradeFound.members.memberOne.id.toString() === user._id.toString();
      const isUserMemberTwo =
        tradeFound.members.memberTwo.id.toString() === user._id.toString();
      if (
        (!isUserMemberOne && !isUserMemberTwo) ||
        (isUserMemberOne && tradeFound.members.memberOne.hasRated) ||
        (isUserMemberTwo && tradeFound.members.memberTwo.hasRated)
      ) {
        throw new BadRequestError("You have already rated this trade.");
      }
      userFound.userRatings.push(data);
      if (isUserMemberOne) {
        tradeFound.members.memberOne.hasRated = true;
      } else if (isUserMemberTwo) {
        tradeFound.members.memberTwo.hasRated = true;
      }

      const [resultUser, resultTrade] = await Promise.all([
        userFound.save(),
        tradeFound.save(),
      ]);
      return {
        status: "success",
        payload: "Rating updated",
      };
    } catch (error) {
      throw error;
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
      throw error;
    }
  }

  async getSuggestions(
    categoryId: string | null,
    page: string | null,
    user: IUser
  ) {
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

    const interests: specialty[] = user.interests;
    const interestsIds: Types.ObjectId[] = interests.map(
      (interest) => interest.specialtyId
    );

    const specialties: specialty[] = user.specialties;
    const specialtiesIds: Types.ObjectId[] = specialties.map(
      (specialty) => specialty.specialtyId
    );

    let query: any = {
      specialties: {
        $elemMatch: {
          specialtyId: { $in: interestsIds },
        },
      },
      interests: {
        $elemMatch: { specialtyId: { $in: specialtiesIds } },
      },
    };
    if (categoryId) {
      query.specialties.$elemMatch.categoryId = new Types.ObjectId(categoryId);
    }

    if (user.email) {
      query.email = { $ne: user.email };
    }

    try {
      const users = await this.userRepository.find(query, options);
      return {
        status: "success",
        payload: users,
      };
    } catch (error: any) {
      throw error;
    }
  }
}
