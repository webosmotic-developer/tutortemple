import fnSetupLocalPassport from './local/passport';
import fnLocal from './local/local';
import UsersDAO from '../api/users/users.dao';

export default function fnAuthRoutes(router) {
    const usersDAO = new UsersDAO();

    /**
     *  Passport Configuration
     */
    fnSetupLocalPassport(usersDAO);

    router.route('/auth/login').post(fnLocal);
    router.route('/auth/logout')
        .get((req, res) => {
            res.clearCookie('connect.sid', {path: '/'}); // see comments above
            res.status(200).json({message: 'Logout successfully.'}); // tell the client everything went well
        });
}
