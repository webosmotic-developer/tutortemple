import * as _ from 'lodash';
import * as passport from 'passport';

import Auth from '../auth';

export default function fnLocal(req, res, next) {
    const auth = new Auth();
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
        const token = auth.fnSignToken(user._id);
        const fullName = '';
        const filterUser = _.pick(user, _.keys({
            id: null,
            email: null,
            roles: null,
            provider: null
        }));
        res.json({token: token, user: _.assign({}, filterUser, {fullName: fullName})});
    })(req, res, next);
}
