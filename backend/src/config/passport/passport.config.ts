import passport from 'passport';
//finduserByID
import { strategyJWT } from './strategies/jwt.strategy';
import { IUser } from '../../models/User.model';

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

export const initializePassport = () => {
    passport.use('jwt', strategyJWT);

    passport.serializeUser((user: IUser, done: (err: any, id?: string) => void) => {
        done(null, user.id.toString());
    });

    passport.deserializeUser(async (id: string, done: (err: any, user?:IUser | null) => void) => {
        try {
            //finduserByID

            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}