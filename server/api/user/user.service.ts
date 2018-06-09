import * as _ from 'lodash';

import UsersDAO from './user.dao';
import Auth from '../../auth/auth';

export default class UsersService {
    usersDAO = new UsersDAO();

    /**
     * Get all users
     * @param {object} req - request object
     */
    fnGetUsers = (req) => {
        return new Promise((resolve, reject) => {
            this.usersDAO
                .fnGetUsers(req)
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
                    const fullName = user.email.split('@')[0];
                    const filterUser = _.pick(user, _.keys({
                        id: null,
                        email: null,
                        roles: null,
                        provider: null
                    }));
                    const newUserObj = _.assign({}, filterUser, {fullName: fullName});
                    const token = auth.fnSignToken(newUserObj);
                    resolve({token: token});
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
