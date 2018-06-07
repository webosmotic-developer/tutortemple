import DbService from '../../services/db.service';

export default class CategoriesDAO {

    /**
     * Get all categories.
     */
    fnGetCategories = () => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            const {text, values} = db.fnBuildFindQuery('categories');
            db.query(text, values, (err, res) => {
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
            const {text, values} = db.fnBuildFindQuery('categories', {where: {id: id}});
            db.query(text, values, (err, res) => {
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
        return new Promise((resolve, reject) => {
            const {text, values} = db.fnBuildInsertQuery('categories', category);
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
        return new Promise((resolve, reject) => {
            const {text, values} = db.fnBuildUpdateQuery('categories', categoryId, category);
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
            const {text, values} = db.fnBuildDeleteQuery('categories', categoryId);
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
}
