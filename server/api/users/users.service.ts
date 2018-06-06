import UsersDAO from './users.dao';

export default class UsersService {
    usersDAO = new UsersDAO();

    /**
     * create a new user.
     * @param {object} req - request object.
     */
    fnCreateUser = (req) => {
        const userObj = req.body;
        return new Promise((resolve, reject) => {
            if (userObj.email && userObj.password && userObj.roles) {
                return this.usersDAO
                    .fnCreateUser(userObj)
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
