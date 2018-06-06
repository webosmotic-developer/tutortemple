import DbService from '../../services/db.service';

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
                    resolve(res.rows[0]);
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
     * Create single user info by user.
     * @param {string} user
     */
    fnCreateUser = (user) => {
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
}
