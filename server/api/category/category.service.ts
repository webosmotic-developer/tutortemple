import CategoriesDAO from './category.dao';

export default class CategoriesService {
    categoriesDAO = new CategoriesDAO();

    /**
     * Get all category
     */
    fnGetCategories = () => {
        return new Promise((resolve, reject) => {
            this.categoriesDAO
                .fnGetCategories()
                .then(categories => resolve(categories))
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Get single category info by id.
     * @param {object} req
     */
    fnGetCategoryById = (req) => {
        const categoryId = req.params.id;
        return new Promise((resolve, reject) => {
            this.categoriesDAO
                .fnGetCategoryById(categoryId)
                .then(category => resolve(category))
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Update existing category.
     * @param {object} req - request object.
     */
    fnCreateCategory = (req) => {
        const categoryObj = req.body;
        return new Promise((resolve, reject) => {
            this.categoriesDAO
                .fnCreateCategory(categoryObj)
                .then(category => resolve(category))
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Update existing category.
     * @param {object} req - request object.
     */
    fnUpdateCategory = (req) => {
        const categoryId = req.params.id;
        const categoryObj = req.body;
        return new Promise((resolve, reject) => {
            this.categoriesDAO
                .fnUpdateCategory(categoryId, categoryObj)
                .then(category => resolve(category))
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Delete category.
     * @param {object} req - request object.
     */
    fnDeleteCategory = (req) => {
        const categoryId = req.params.id;
        return new Promise((resolve, reject) => {
            this.categoriesDAO
                .fnDeleteCategory(categoryId)
                .then(category => resolve(category))
                .catch(error => {
                    reject(error);
                });
        });
    }
}
