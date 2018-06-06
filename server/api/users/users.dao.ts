import DbService from '../../services/db.service';

export default class UsersDAO {
    /**
     * Sign up a new user.
     * @param {object} req - request object.
     */
    fnSignUp = (req) => {
    };

    /**
     * Get single user info by id.
     * @param {number} id
     */
    fnGetUserById = (id) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
                if (err) {
                    reject(err);
                }
                db.end();
                resolve(res.rows[0]);
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
                if (err) {
                    reject(err);
                }
                db.end();
                resolve(res.rows[0]);
            });
        });
    };
}
