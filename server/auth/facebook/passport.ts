import * as passport from 'passport';
import * as dotenv from 'dotenv';

dotenv.load({path: '.env'});

export default function fnSetupFacebookPassport(UsersDAO: any) {
    const FacebookStrategy = require('passport-facebook').Strategy;

    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
        },
        function (accessToken, refreshToken, profile, done) {
            UsersDAO.fnGetUserByFacebookId(profile.id)
                .then((user) => {
                    console.log('profile ++++++++++++++++++', profile);
                    console.log('user ++++++++++++++++++', user);
                    if (!user) {
                        return done(null, user);
                    } else {
                        return done(null, user);
                    }
                })
                .catch((err) => {
                    if (err) {
                        console.error('Passport:fnSetupFacebookPassport() => fnGetUserByFacebookId()', err);
                        return done(err);
                    }
                });
        }
    ));
}
