import DbService from '../../services/db.service';
import DAO from '../../services/dao.service';

export default class CategoriesDAO extends DAO {

    table = 'categories';

    /**
     * Get all category.
     */
    fnGetCategories = () => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            this.fnFind()
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => reject(err));
        });
    }

    /**
     * Get single category info by id.
     * @param {number} id
     */
    fnGetCategoryById = (id) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            this.fnFindOne(id)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    /**
     * Create category.
     * @param {object} category - request object.
     */
    fnCreateCategory = (category) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            this.fnInsert(category)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
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
            this.fnUpdate(categoryId, category)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    /**
     * Delete category.
     * @param {string} categoryId - request object.
     */
    fnDeleteCategory = (categoryId) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            this.fnDelete(categoryId)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
}
