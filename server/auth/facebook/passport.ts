import * as passport from 'passport';
import * as dotenv from 'dotenv';

dotenv.load({path: '.env'});

export default function fnSetupFacebookPassport(UsersDAO: any) {
    const FacebookStrategy = require('passport-facebook').Strategy;

    FacebookStrategy.passReqToCallback = true;
    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
            passReqToCallback: true
        },
        function (req, accessToken, refreshToken, profile, done) {
            UsersDAO.fnGetUserByFacebookId(profile.id)
                .then((user) => {
                    console.log('profile ++++++++++++++++++', profile);
                    console.log('user ++++++++++++++++++', user);
                    console.log('req ++++++++++++++++++', req);
                    if (!user) {
                        return done(null, user);
                    } else {
                        /*if (!req._toParam) {
                            console.error('User doesn\'t exists');
                            return done(null, {
                                message: {
                                    name: 'error',
                                    detail: 'User doesn\'t exist.',
                                }
                            });
                        } else {
                            user = {
                                email: profile._json.email,
                                roles: req._toParam,
                                facebook: profile._json
                            };
                            UsersDAO.fnCreateUser(user)
                                .then(response => done(null, response))
                                .catch(err => done(err));
                        }*/
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
