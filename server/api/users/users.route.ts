import UsersController from './users.controller';

export default function fnUsersRoutes(router) {

    const usersCtrl = new UsersController();

    router.route('/sign-up').post(usersCtrl.fnSignUp);
    router.route('/user/:id')
        .get(usersCtrl.fnGetUserById)
        .put(usersCtrl.fnUpdateUser);
}
