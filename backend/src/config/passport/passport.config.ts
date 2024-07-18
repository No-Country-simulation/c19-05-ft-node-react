import passport from "passport";
import strategyJWT from "./strategies/jwt.strategy";
import strategyGmail from "./strategies/gmail.startegy";
import UserModel, { IUser } from "../../models/User.model";
import { UserRepository } from "../../repositories/User.repository";

const userRepo = new UserRepository();
declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

export const initializePassport = () => {
  passport.use("jwt", strategyJWT);
  passport.use("gmail", strategyGmail);

  passport.serializeUser(
    (user: IUser, done: (err: any, id?: string) => void) => {
      done(null, user.id.toString());
    }
  );

  passport.deserializeUser(
    async (id: string, done: (err: any, user?: IUser | null) => void) => {
      try {
        const user = await UserModel.findById(id)
          .populate({
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
          })
          .populate({
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
          })
          .populate({
            path: "userRatings",
            populate: {
              path: "userId",
              select: "name avatar",
            },
          });

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  );
};
