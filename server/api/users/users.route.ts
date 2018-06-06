import UsersController from './users.controller';

export default function fnUsersRoutes(router) {

    const usersCtrl = new UsersController();

    router.route('/sign-up').post(usersCtrl.fnSignUp);
    router.route('/create-user').post(usersCtrl.fnCreateUser);

}
