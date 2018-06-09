import * as _ from 'lodash';
import * as passport from 'passport';

import Auth from '../auth';
import UsersDAO from '../../api/user/user.dao';
import UserSocket from '../../api/user/user.socket';

export default function fnLocal(req, res, next) {
    const auth = new Auth();
    const usersDAO = new UsersDAO();
    const userSocket = new UserSocket();

    passport.authenticate('local', function (err, user, info) {
        const error = err || info;
        if (error) {
            console.error('LocalAuth:fnLocal() => passport.authenticate()', error);
            return res.status(401).json(error);
        }
        if (!user) {
            console.error('LocalAuth:fnLocal() => passport.authenticate()', 'Something went wrong, please try again.');
            return res.status(404).json({message: 'Something went wrong, please try again.'});
        }
        const fullName = user.email.split('@')[0];
        const filterUser = _.pick(user, _.keys({
            id: null,
            email: null,
            roles: null,
            provider: null
        }));
        const userObj = _.assign({}, filterUser, {fullName: fullName});
        const token = auth.fnSignToken(userObj);
        usersDAO.fnUpdateUser(user.id, {is_online: true})
            .then(() => {
                // userSocket.fnAddUser(user);
                res.json({token: token});
            });
    })(req, res, next);
}
