import * as passport from 'passport';
import * as dotenv from 'dotenv';
import * as _ from 'lodash';

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
                    if (user && !_.isEmpty(user)) {
                        return done(null, user);
                    } else if (_.isEmpty(user) || !user) {
                        if (!req.query.state) {
                            console.error('User doesn\'t exists');
                            return done({ message: 'User does not exists.' });
                        } else {
                            UsersDAO.fnGetUserByEmail(profile.email)
                                .then(response => {
                                    if (!response) {
                                        user = {
                                            email: profile._json.email,
                                            roles: req.query.state,
                                            facebook: profile._json
                                        };
                                        UsersDAO.fnCreateUser(user)
                                            .then(res => done(null, res))
                                            .catch(err => {
                                                console.error(err);
                                                return done(err);
                                            });
                                    } else {
                                        console.error('This email is already registered.');
                                        return done({ message: 'This email is already registered.' });
                                    }
                                })
                                .catch(err => {
                                    console.error(err);
                                    return done(err);
                                });

                        }
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
