import DAO from '../../services/dao.service';
import DbService from '../../services/db.service';

export default class UsersDAO extends DAO {

    table = 'users';

    /**
     * Get all users.
     */
    fnGetUsers = () => {
        return new Promise((resolve, reject) => {
            this.fnFind()
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    };

    /**
     * Get single user info by id.
     * @param {number} id
     */
    fnGetUserById = (id: number) => {
        return new Promise((resolve, reject) => {
            this.fnFindOne(id)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    };

    /**
     * Insert a new user.
     * @param {object} user
     */
    fnCreateUser = (user: any) => {
        return new Promise((resolve, reject) => {
            this.fnInsert(user)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    };

    /**
     * Update existing user.
     * @param {number} userId - request object.
     * @param {object} user - request object.
     */
    fnUpdateUser = (userId: number, user: any) => {
        return new Promise((resolve, reject) => {
            this.fnUpdate(userId, user)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    };

    /**
     * Delete user.
     * @param {string} userId - request object.
     */
    fnDeleteUser = (userId) => {
        return new Promise((resolve, reject) => {
            this.fnDelete(userId)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    };

    /**
     * Get single user info by email.
     * @param {string} email
     */
    fnGetUserByEmail = (email: string) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            const {text, values} = db.fnBuildFindOneQuery('users', {where: {email: email}});
            db.query(text, values, (err, res) => {
                db.end();
                if (err) {
                    reject(err);
                } else if (res) {
                    resolve(res.rows[0]);
                }
            });
        });
    };

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
    };
}
