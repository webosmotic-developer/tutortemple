import * as passport from 'passport';

export default function fnSetupLocalPassport(UsersDAO: any) {
    const LocalStrategy = require('passport-local').Strategy;

    passport.use('local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            UsersDAO.fnGetUserByEmail(email.toLowerCase())
                .then((user) => {
                    if (!user) {
                        console.error('Passport:fnSetupLocalPassport() => fnGetUserByEmail()', 'This email is not registered.');
                        return done(null, false, {message: 'This email is not registered.'});
                    }
                    if (user.password !== password) {
                        console.error('Passport:fnSetupLocalPassport() => fnGetUserByEmail()', 'This password is not correct.');
                        return done(null, false, {message: 'This password is not correct.'});
                    }
                    return done(null, user);
                })
                .catch((err) => {
                    if (err) {
                        console.error('Passport:fnSetupLocalPassport() => fnGetUserByEmail()', err);
                        return done(err);
                    }
                });
        }
    ));
}
