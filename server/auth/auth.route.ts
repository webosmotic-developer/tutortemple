import * as passport from 'passport';

import fnSetupFacebookPassport from './facebook/passport';
import fnSetupLocalPassport from './local/passport';
import fnLocal from './local/local';
import Auth from './auth';
import UsersDAO from '../api/users/users.dao';

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
            res.clearCookie('connect.sid', {path: '/'}); // see comments above
            res.status(200).json({message: 'Logout successfully.'}); // tell the client everything went well
        });

    router.route('/auth/facebook')
        .get(passport.authenticate('facebook', {
            scope: ['email'],
            failureRedirect: '/signup',
            session: false
        }));

    router.route('/auth/facebook/callback')
        .get(passport.authenticate('facebook', {
            failureRedirect: '/signup',
            session: false
        }), auth.fnSetTokenCookie);
}
