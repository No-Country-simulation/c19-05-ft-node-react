import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import { Request } from 'express';
import { envs } from '../../envs/env.config';
import { UserRepository } from '../../../repositories/User.repository';

type TokenPayload = {
    id: string;
  };

const userRepo = new UserRepository()

const cookieExtractor = (req: Request): string | null => {
    const cookieHeader = req.headers.cookie;
    console.log(cookieHeader)
    if (cookieHeader) {
        const cookies = cookieHeader.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'token') {
                console.log(value)
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
        console.log("Llegó al strategyJWT");
        const user = await userRepo.findOne(payload.id);

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});