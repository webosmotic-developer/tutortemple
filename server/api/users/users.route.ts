import UsersController from './users.controller';
import Auth from '../../auth/auth';

export default function fnUsersRoutes(router) {

    const usersCtrl = new UsersController();
    const auth = new Auth();

    router.route('/sign-up').post(usersCtrl.fnSignUp);
    router.route('/user')
        .get(auth.fnIsAuthenticated(), usersCtrl.fnGetUsers)
        .post(auth.fnIsAuthenticated(), usersCtrl.fnCreateUser);
    router.route('/user/:id')
        .get(auth.fnIsAuthenticated(), usersCtrl.fnGetUserById)
        .put(auth.fnIsAuthenticated(), usersCtrl.fnUpdateUser)
        .delete(auth.fnIsAuthenticated(), usersCtrl.fnDeleteUser);
}
