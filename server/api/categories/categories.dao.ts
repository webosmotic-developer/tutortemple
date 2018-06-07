import DbService from '../../services/db.service';
import Common from '../../services/utils/common';

export default class CategoriesDAO {

    /**
     * Get all categories.
     */
    fnGetCategories = () => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM categories', null, (err, res) => {
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

    /**
     * Get single category info by id.
     * @param {number} id
     */
    fnGetCategoryById = (id) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM categories WHERE id = $1', [id], (err, res) => {
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
                                detail: 'Category doesn\'t exist',
                            }
                        });
                    }
                }
            });
        });
    }

    /**
     * Create category.
     * @param {object} category - request object.
     */
    fnCreateCategory = (category) => {
        const db = new DbService();
        const common = new Common();
        return new Promise((resolve, reject) => {
            const text = 'INSERT INTO categories (name, description) VALUES($1, $2) RETURNING *';
            const values = [`${category.name}`, `${category.description}`];
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
                                    detail: 'Category doesn\'t exist',
                                }
                            });
                        }
                    }
                });
        });
    }

    /**
     * Update existing category.
     * @param {string} categoryId - request object.
     * @param {object} category - request object.
     */
    fnUpdateCategory = (categoryId, category) => {
        const db = new DbService();
        const common = new Common();
        return new Promise((resolve, reject) => {
            const {text, values } = common.generateUpdateQuery(categoryId, category, 'categories');
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
                                    detail: 'Category doesn\'t exist',
                                }
                            });
                        }
                    }
                });
        });
    }

    /**
     * Delete category.
     * @param {string} categoryId - request object.
     */
    fnDeleteCategory = (categoryId) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            db.query('Delete from categories where id = $1 Returning *', [categoryId],
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
                                    detail: 'Category doesn\'t exist',
                                }
                            });
                        }
                    }
                });
        });
    }
}
