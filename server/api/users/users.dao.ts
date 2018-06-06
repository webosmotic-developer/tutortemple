import DbService from '../../services/db.service';
import Common from '../../services/utils/common';

export default class UsersDAO {

    /**
     * Get single user info by id.
     * @param {number} id
     */
    fnGetUserById = (id) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
                db.end();
                if (err) {
                    reject(err);
                } else {
                    if (res.rows.length > 0) {
                        resolve(res.rows[0]);
                    } else {
                        reject({
                            message: {
                                name: 'error',
                                detail: 'User doesn\'t exist',
                            }
                        });
                    }
                }
            });
        });
    };

    /**
     * Get single user info by email.
     * @param {string} email
     */
    fnGetUserByEmail = (email) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = $1', [email], (err, res) => {
                db.end();
                if (err) {
                    reject(err);
                } else if (res) {
                    resolve(res.rows[0]);
                }
            });
        });
    }

    /**
     * Sign up a new user.
     * @param {object} user
     */
    fnSignUp = (user) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            const text = 'INSERT INTO users (email, password, roles, is_verified) VALUES($1, $2, $3, $4) RETURNING *';
            const values = [`${user.email}`, `${user.password}`, `${user.roles}`, true];
            db.query(text, values,
                (err, res) => {
                    db.end();
                    if (err) {
                        reject(err);
                    } else if (res) {
                        resolve(res.rows[0]);
                    }
                });
        });
    }

    /**
     * Get single user info by facebook id.
     * @param {string} id
     */
    fnGetUserByFacebookId = (id) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE facebook ->> \'id\' = $1', [id], (err, res) => {
                db.end();
                if (err) {
                    reject(err);
                } else {
                    resolve(res.rows[0]);
                }
            });
        });
    }

    /**
     * Update existing user.
     * @param {string} userId - request object.
     * @param {object} user - request object.
     */
    fnUpdateUser = (userId, user) => {
        const db = new DbService();
        const common = new Common();
        return new Promise((resolve, reject) => {
            const {text, values } = common.generateUpdateQuery(userId, user, 'users');
            db.query(text, values,
                (err, res) => {
                    db.end();
                    if (err) {
                        reject(err);
                    } else if (res) {
                        if (res.rows.length > 0) {
                            resolve(res.rows[0]);
                        } else {
                            reject({
                                message: {
                                    name: 'error',
                                    detail: 'User doesn\'t exist',
                                }
                            });
                        }
                    }
                });
        });
    }
}
