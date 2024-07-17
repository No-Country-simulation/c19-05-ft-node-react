import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { envs } from "../../envs/env.config";
import UserModel from "../../../models/User.model";

const serverUrl =  envs.SERVER_URL;


const options = {
    clientID: envs.GOOGLE_CLIENT_ID,
    clientSecret: envs.GOOGLE_CLIENT_SECRET,
    callbackURL: `${serverUrl}${envs.GOOGLE_CALLBACK_URL}`,
    proxy: true,
}


// google strategy
const strategyGmail = new GoogleStrategy(options, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await UserModel.findOne({email: profile.email});
        
        if (user) {
            return done(null, user);
        }

        const newUser = await UserModel.create({
            name: profile.displayName,
            email: profile.email,
            password: profile.id,
            avatar: profile.picture
        })

        return done(null, newUser)


    } catch (err) {

        console.log(err);
    }
},
);

export default strategyGmail;