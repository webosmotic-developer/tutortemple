import CategoriesService from './category.service';

export default class CategoriesController {
    categoriesService = new CategoriesService();

    /**
     * Get a category.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetCategoryById = (req, res) => {
        this.categoriesService
            .fnGetCategoryById(req)
            .then(category => res.status(201).json(category))
            .catch(error => {
                console.error('CategoriesController:fnGetCategoryById ', error);
                res.status(422).json({message: error});
            });
    }

    /**
     * Create category.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnCreateCategory = (req, res) => {
        this.categoriesService
            .fnCreateCategory(req)
            .then(category => res.status(200).json(category))
            .catch(error => {
                console.error('CategoriesController:fnCreateCategory', error);
                res.status(400).json({message: error});
            });
    }

    /**
     * Update existing category.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnUpdateCategory = (req, res) => {
        this.categoriesService
            .fnUpdateCategory(req)
            .then(category => res.status(200).json(category))
            .catch(error => {
                console.error('CategoriesController:fnUpdateCategory', error);
                res.status(400).json({message: error});
            });
    }

    /**
     * Get all category
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetCategories = (req, res) => {
        this.categoriesService
            .fnGetCategories()
            .then(categories => res.status(200).json(categories))
            .catch(error => {
                console.error('CategoriesController:fnUpdateCategory', error);
                res.status(400).json({message: error});
            });
    }

    /**
     * Delete category
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnDeleteCategory = (req, res) => {
        this.categoriesService
            .fnDeleteCategory(req)
            .then(category => res.status(200).json(category))
            .catch(error => {
                console.error('CategoriesController:fnUpdateCategory', error);
                res.status(400).json({message: error});
            });
    }
}
