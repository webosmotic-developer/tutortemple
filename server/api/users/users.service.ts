import UsersDAO from './users.dao';

export default class UsersService {
    usersDAO = new UsersDAO();

    /**
     * Sign up a new user.
     * @param {object} req - request object.
     */
    fnSignUp = (req) => {
        const userObj = req.body;
        return new Promise((resolve, reject) => {
            if (userObj.email && userObj.password && userObj.roles) {
                this.usersDAO
                    .fnSignUp(userObj)
                    .then(user => resolve(user))
                    .catch(error => {
                        reject(error);
                    });
            } else {
                reject({
                    message: {
                        name: 'error',
                        code: '23505',
                        detail: 'Missing required field.'
                    }
                });
            }
        });
    }

    /**
     * Get single user info by id.
     * @param {number} id
     */
    fnGetUserById = (req) => {
        const userId = req.params.id;
        return new Promise((resolve, reject) => {
            this.usersDAO
                .fnGetUserById(userId)
                .then(user => resolve(user))
                .catch(error => {
                    reject(error);
                });
        });
    }

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
                .catch(error => {
                    reject(error);
                });
        });
    }

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
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Get all users
     */
    fnGetUsers = () => {
        return new Promise((resolve, reject) => {
            this.usersDAO
                .fnGetUsers()
                .then(users => resolve(users))
                .catch(error => {
                    reject(error);
                });
        });
    }
}
