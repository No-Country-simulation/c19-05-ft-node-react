import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
// find userbyID
import dotenv from 'dotenv';
import { Request } from 'express';
import { envs } from '../../envs/env.config';

interface JwtPayload {
    user: {
        id: string;
    };
}

const cookieExtractor = (req: Request): string | null => {
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
        const cookies = cookieHeader.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'jwt') {
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

export const strategyJWT = new JwtStrategy(options, async (payload: JwtPayload, done: VerifiedCallback) => {
    try {
        //finduserbyid usando id en payload.user.id
        const user = "usuario"

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});