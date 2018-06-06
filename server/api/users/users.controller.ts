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
                console.error('UsersController:fnCreateUser ', error);
                res.status(422).json({message: error});
            });
    }
}
