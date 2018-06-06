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
}
