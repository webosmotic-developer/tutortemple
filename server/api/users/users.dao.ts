import DbService from '../../services/db.service';

export default class UsersDAO {

    /**
     * Get single user info by id.
     * @param {number} id
     */
    fnGetUserById = (id: number) => {
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
    fnGetUserByEmail = (email: string) => {
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
    fnSignUp = (user: object) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            const {text, values} = db.fnBuildInsertQuery('users', user);
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
     * @param {number} id
     */
    fnGetUserByFacebookId = (id: number) => {
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
     * @param {number} userId - request object.
     * @param {object} user - request object.
     */
    fnUpdateUser = (userId: number, user: object) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            const {text, values} = db.fnBuildUpdateQuery('users', userId, user);
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

    /**
     * Delete user.
     * @param {string} userId - request object.
     */
    fnDeleteUser = (userId) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            db.query('Delete from users where id = $1 Returning *', [userId],
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

    /**
     * Get all users.
     */
    fnGetUsers = () => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users', null, (err, res) => {
                db.end();
                if (err) {
                    reject(err);
                } else {
                    if (res.rows.length > 0) {
                        resolve(res.rows);
                    } else {
                        resolve([]);
                    }
                }
            });
        });
    }
}
