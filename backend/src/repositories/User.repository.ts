/** @format */

import { Types } from "mongoose";
import User, { IUser, userRating } from "../models/User.model";
import { RegisterType } from "../utils/schema/auth.schema";
import { populate } from "dotenv";

type OptionsType = {
  page: number;
  limit: number;
  select: string;
  populate: { path: string }[];
};

type Query = {
  specialties: {
    $elemMatch: {
      categoryId: Types.ObjectId;
    };
  };
};

export class UserRepository {
  constructor(private readonly UserModel = User) {}

  async create(data: RegisterType): Promise<IUser> {
    try {
      const user = await this.UserModel.create(data);
      return user;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw Error("Error al crear usuario");
    }
  }

  async find(query: Query | {}, options: OptionsType) {
    try {
      return await this.UserModel.paginate(query, options);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }
    }
  }

  async findOnePopulated(id: string | Types.ObjectId): Promise<IUser | null> {
    try {
      const result = await this.UserModel.findById(id)
        .select(
          "_id name email description phoneNumber specialties interests userRatings trades contacts"
        )
        .populate({
          path: "trades",
          populate: [
            {
              path: "members.memberOne.id",
              model: "User",
              select: "name email _id",
            },
            {
              path: "members.memberTwo.id",
              model: "User",
              select: "name email _id",
            },
            {
              path: "members.memberOne.specialty",
              model: "Specialty",
              select: "name",
              populate: [
                { path: "categoryId", model: "Category", select: "name" },
              ],
            },
            {
              path: "members.memberTwo.specialty",
              model: "Specialty",
              select: "name",
              populate: [
                { path: "categoryId", model: "Category", select: "name" },
              ],
            },
          ],
        })
        .populate("specialties")
        .populate("contacts")
        .lean();
      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }
      throw Error("Error al buscar un usuario");
    }
  }
  async findOne(id: string | Types.ObjectId): Promise<IUser> {
    try {
      const result = await this.UserModel.findById(id);
      if (!result) {
        throw new Error("Usuario no encontrado");
      }
      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }
      throw Error("Error al buscar un usuario");
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.UserModel.findOne({ email }).select(
        "_id name email provider description password phoneNumber specialties interests userRatings trades contacts"
      );
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }
      throw Error("Error al buscar un usuario por email");
    }
  }

  async update(
    id: string | Types.ObjectId,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      return await this.UserModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }
      throw Error("Error al actualizar un usuario");
    }
  }

  async updateTrades(
    id: string | Types.ObjectId,
    tradeId: Types.ObjectId
  ): Promise<IUser | null> {
    try {
      const user = await this.UserModel.findById(id);
      if (!user) return null;
      user.trades.push(tradeId);
      return await user.save();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }
      throw Error("Error al actualizar un usuario");
    }
  }

  async updateByEmail(
    email: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      return await this.UserModel.findOneAndUpdate({ email }, data, {
        new: true,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }
      throw Error("Error al actualizar un usuario");
    }
  }

  async updateRating(data: userRating) {}

  async delete(id: string): Promise<IUser | null> {
    try {
      return await this.UserModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }
      throw Error("Error al eliminar un usuario");
    }
  }

  // método para agregar especialidad
  async addSpecialty(
    docId: string,
    specialtyId: string,
    categoryId: string
  ): Promise<IUser | null> {
    try {
      // método de Mongoose para ACTUALIZAR un usuario, devuelva el usuario en sí o nulo
      // await this.UserModel.findByIdAndUpdate(docId, {specialties: [specialtyId, categoryId]});
      const userUpdated = await this.UserModel.findByIdAndUpdate(
        docId,
        {
          $push: {
            specialties: { categoryId, specialtyId },
          },
        },
        { new: true }
      );

      return userUpdated;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw Error(error.message);
      }
      throw Error("Error al eliminar un usuario");
    }
  }
}
