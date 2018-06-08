import * as jwt from 'jsonwebtoken';
import * as compose from 'composable-middleware';
import * as expressJwt from 'express-jwt';

import UsersDAO from '../api/user/user.dao';
import {Constant} from '../constant';

const SECRET_SESSION = 'tutortemple' || process.env.SECRET_SESSION;
const validateJwt = expressJwt({secret: SECRET_SESSION});
const roles = [
    Constant.ROLE_ADMIN,
    Constant.ROLE_TEACHER,
    Constant.ROLE_STUDENT
];

export default class Auth {
    usersDAO = new UsersDAO();
    /**
     * Attaches the user object to the request if authenticated
     * Otherwise returns 401
     */
    fnIsAuthenticated = () => {
        return compose()
        // Validate jwt
            .use((req, res, next) => {
                // allow access_token to be passed through query parameter as well
                if (req.query && req.query.hasOwnProperty('access_token')) {
                    req.headers.authorization = 'Bearer ' + req.query.access_token;
                }
                validateJwt(req, res, next);
            })
            // Attach user to request
            .use((req, res, next) => {
                this.usersDAO.fnGetUserById(req.user.id)
                    .then((user) => {
                        if (!user) {
                            console.error('Auth:fnIsAuthenticated() => findById()',
                                'The request has not been applied because it lacks valid authentication credentials ' +
                                'for the target resource.');
                            return res.status(401)
                                .json({
                                    message: 'The request has not been applied ' +
                                    'because it lacks valid authentication credentials for the target resource.'
                                });
                        }
                        req.user = user;
                        next();
                    })
                    .catch((err) => {
                        if (err) {
                            console.error('Auth:fnIsAuthenticated() => findById()', err);
                            return next(err);
                        }
                    });
            });
    };

    /**
     * Checks if the user role meets the minimum requirements of the route
     */
    fnHasRole = (roleRequired) => {
        if (!roleRequired) {
            console.error('Auth:fnHasRole()', 'Required role needs to be set');
            throw new Error('Required role needs to be set');
        }

        return compose()
            .use(this.fnIsAuthenticated())
            .use(function meetsRequirements(req, res, next) {
                if (roles.indexOf(req.user.role) >= roles.indexOf(roleRequired)) {
                    next();
                } else {
                    console.error('Auth:fnHasRole()', 'The server understood the request but refuses to authorize it.');
                    res.status(403)
                        .json({
                            message: 'The server understood the request but refuses to authorize it.'
                        });
                }
            });
    };

    /**
     * Returns a jwt token signed by the app secret
     * JWT token expires in 7 day.
     */
    fnSignToken = (id) => {
        return jwt.sign({id: id}, SECRET_SESSION, {expiresIn: '7d'});
    };

    /**
     * Set token cookie directly for oAuth strategies
     */
    fnSetTokenCookie = (req, res) => {
        console.log('+++++++++++++++ fnSetTokenCookie +++++++++++++++++++++++', req.user);
        if (!req.user) {
            console.error('Auth:fnSetTokenCookie()', 'Something went wrong, please try again.');
            return res.status(404).json({message: 'Something went wrong, please try again.'});
        }
        const token = this.fnSignToken(req.user.id);
        res.cookie('token', JSON.stringify(token));
        res.redirect('/');
    };
}
