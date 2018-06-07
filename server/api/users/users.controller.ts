import UsersService from './users.service';

export default class UsersController {
    usersService = new UsersService();

    /**
     * Sign up a new user.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnSignUp = (req, res) => {
        this.usersService
            .fnSignUp(req)
            .then(user => res.status(201).json(user))
            .catch(error => {
                console.error('UsersController:fnSignUp ', error);
                res.status(422).json({message: error});
            });
    }

    /**
     * Get a user.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetUserById = (req, res) => {
        this.usersService
            .fnGetUserById(req)
            .then(user => res.status(201).json(user))
            .catch(error => {
                console.error('UsersController:fnGetUserById ', error);
                res.status(422).json({message: error});
            });
    }

    /**
     * Update existing user.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnUpdateUser = (req, res) => {
        this.usersService
            .fnUpdateUser(req)
            .then(user => res.status(200).json(user))
            .catch(error => {
                console.error('UsersController:fnUpdateUser', error);
                res.status(400).json({message: error});
            });
    };
}
