import * as passport from 'passport';

import fnSetupFacebookPassport from './facebook/passport';
import fnSetupLocalPassport from './local/passport';
import fnLocal from './local/local';
import Auth from './auth';
import UsersDAO from '../api/user/user.dao';

export default function fnAuthRoutes(router) {
    const auth = new Auth();
    const usersDAO = new UsersDAO();

    /**
     *  Passport Configuration
     */
    fnSetupFacebookPassport(usersDAO);
    fnSetupLocalPassport(usersDAO);

    router.route('/auth/login').post(fnLocal);
    router.route('/auth/logout')
        .get((req, res) => {
            req.logout();
            res.status(200).json({message: 'Logout successfully.'});
        });

    router.route('/auth/facebook')
        .get(passport.authenticate('facebook', {
            scope: ['email'],
            successRedirect: '/',
            failureRedirect: '/',
            session: false
        }));

    router.route('/auth/facebook/callback')
        .get(passport.authenticate('facebook', {
            failureRedirect: '/',
            session: false
        }), auth.fnSetTokenCookie);
}
