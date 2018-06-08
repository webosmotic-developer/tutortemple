import UsersDAO from './user.dao';
import Auth from '../../auth/auth';

export default class UsersService {
    usersDAO = new UsersDAO();

    /**
     * Get all users
     */
    fnGetUsers = () => {
        return new Promise((resolve, reject) => {
            this.usersDAO
                .fnGetUsers()
                .then(users => resolve(users))
                .catch((error) => reject(error));
        });
    };

    /**
     * Get single user info by id.
     * @param {object} req - request object
     */
    fnGetUserById = (req) => {
        const userId = req.params.id;
        return new Promise((resolve, reject) => {
            this.usersDAO
                .fnGetUserById(userId)
                .then(user => resolve(user))
                .catch((error) => reject(error));
        });
    };

    /**
     * Sign up a new user.
     * @param {object} req - request object.
     */
    fnSignUp = (req) => {
        const userObj = req.body;
        const auth = new Auth();
        return new Promise((resolve, reject) => {
            this.usersDAO
                .fnCreateUser(userObj)
                .then((user: any) => {
                    const res  = {
                        token: auth.fnSignToken(user.id),
                        user: user,
                    };
                    resolve(res);
                })
                .catch((error) => reject(error));
        });
    };

    /**
     * Insert a new user.
     * @param {object} req - request object.
     */
    fnCreateUser = (req) => {
        const userObj = req.body;
        return new Promise((resolve, reject) => {
            this.usersDAO
                .fnCreateUser(userObj)
                .then(user => resolve(user))
                .catch((error) => reject(error));
        });
    };

    /**
     * Update existing user.
     * @param {object} req - request object.
     */
    fnUpdateUser = (req) => {
        const userId = req.params.id;
        const userObj = req.body;
        return new Promise((resolve, reject) => {
            this.usersDAO
                .fnUpdateUser(userId, userObj)
                .then(user => resolve(user))
                .catch((error) => reject(error));
        });
    };

    /**
     * Delete user.
     * @param {object} req - request object.
     */
    fnDeleteUser = (req) => {
        const userId = req.params.id;
        return new Promise((resolve, reject) => {
            this.usersDAO
                .fnDeleteUser(userId)
                .then(user => resolve(user))
                .catch((error) => reject(error));
        });
    };
}
