import * as passport from 'passport';
import * as dotenv from 'dotenv';

dotenv.load({path: '.env'});

export default function fnSetupFacebookPassport(UsersDAO: any) {
    const FacebookStrategy = require('passport-facebook').Strategy;

    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: '/api/auth/facebook/callback',
            profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
        },
        function (accessToken, refreshToken, profile, done) {
            UsersDAO.fnGetUserByFacebookId(profile.id)
                .then((user) => {
                    console.log('profile ++++++++++++++++++', profile);
                    if (!user) {
                        done(user);
                    } else {
                        return done(user);
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
