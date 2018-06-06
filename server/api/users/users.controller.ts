import UsersService from './users.service';

export default class UsersController {
    usersService = new UsersService();

    /**
     * Sign up a new user.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnSignUp = (req, res) => {
        /*this.usersDAO
            .fnSignUp(req)
            .then(user => res.status(201).json(user))
            .catch(error => {
                console.error('UsersController:fnSignUp()', error);
                res.status(422).json({message: error});
            });*/
    };

    fnCreateUser = (req, res) => {
        this.usersService
            .fnCreateUser(req)
            .then(user => res.status(201).json(user))
            .catch(error => {
                console.error('UsersController:fnCreateUser ', error);
                res.status(422).json({message: error});
            });
    }
}
