import * as passport from 'passport';

import fnSetupFacebookPassport from './facebook/passport';
import fnSetupLocalPassport from './local/passport';
import fnLocal from './local/local';
import Auth from './auth';
import UsersDAO from '../api/user/user.dao';
import UserSocket from '../api/user/user.socket';

export default function fnAuthRoutes(router) {
    const auth = new Auth();
    const usersDAO = new UsersDAO();
    const userSocket = new UserSocket();

    /**
     *  Passport Configuration
     */
    fnSetupFacebookPassport(usersDAO);
    fnSetupLocalPassport(usersDAO);

    router.route('/auth/login').post(fnLocal);
    router.route('/auth/logout')
        .get((req, res) => {
            req.logout();
            if (req.query.userId) {
                usersDAO.fnUpdateUser(req.query.userId, {is_online: false})
                    .then((user) => {
                        // userSocket.fnRemoveUser(user);
                        res.status(200).json({message: 'Logout successfully.'});
                    });
            } else {
                res.status(400).json({message: 'User Id is required in URL query parameter. eg userId=1'});
            }
        });

    router.route('/auth/facebook', (req, res, next) => {
        console.log('req query string ', req.query);
        passport.authenticate('facebook', {
            scope: ['email'],
            successRedirect: '/',
            failureRedirect: '/',
            session: false
        })(req, res, next);
    });

    router.route('/auth/facebook/callback')
        .get(passport.authenticate('facebook', {
            failureRedirect: '/',
            session: false
        }), auth.fnSetTokenCookie);
}
