import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import { Request } from 'express';
import { envs } from '../../envs/env.config';
import { UserRepository } from '../../../repositories/User.repository';
import UserModel from '../../../models/User.model';

type TokenPayload = {
    id: string;
};

const userRepo = new UserRepository()

const cookieExtractor = (req: Request): string | null => {
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
        const cookies = cookieHeader.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'token') {
                return value;
            }
        }   
    }

    const token = req.cookies ? req.cookies.jwt : null;
    return token;
}

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: envs.JWT_SECRET
}

export const strategyJWT = new JwtStrategy(options, async (payload: TokenPayload, done: VerifiedCallback) => {
    try {
        const user = await UserModel.findById(payload.id).populate({
            path: 'specialties',
            populate: [
              {
                path: 'categoryId',
                select:"name",
                model: 'Category' 
              },
              {
                path: 'specialtyId',
                select:"name",
                model: 'Specialty'
              }
            ]
          })
          .populate({
            path: 'interests',
            populate: [
              {
                path: 'categoryId',
                select:"name",
                model: 'Category' 
              },
              {
                path: 'specialtyId',
                select:"name",
                model: 'Specialty' 
              }
            ]
          })
          .populate({
            path: 'userRatings',
            populate: {
              path: 'userId',
              select: 'name avatar'
            }
          })

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});