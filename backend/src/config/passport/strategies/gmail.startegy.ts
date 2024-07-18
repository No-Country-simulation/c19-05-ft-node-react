import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { envs } from "../../envs/env.config";
import UserModel from "../../../models/User.model";
import { hashPassword } from "../../../utils/bcrypt/bcrypt.config";

const serverUrl = envs.SERVER_URL;

const options = {
  clientID: envs.GOOGLE_CLIENT_ID,
  clientSecret: envs.GOOGLE_CLIENT_SECRET,
  callbackURL: `${serverUrl}${envs.GOOGLE_CALLBACK_URL}`,
  proxy: true,
};

// google strategy
const strategyGmail = new GoogleStrategy(
  options,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await UserModel.findOne({ email: profile.email });

      if (user) {
        return done(null, user);
      }

      const passwordHashed = hashPassword(profile.id);

      const newUser = await UserModel.create({
        name: profile.displayName,
        provider: "google",
        email: profile.email,
        password: passwordHashed,
        avatar: profile.picture,
      });

      return done(null, newUser);
    } catch (err) {
      console.log(err);
    }
  }
);

export default strategyGmail;
