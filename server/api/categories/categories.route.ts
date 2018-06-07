import CategoriesController from './categories.controller';
import Auth from '../../auth/auth';

export default function fnCategoriesRoutes(router) {

    const categoriesCtrl = new CategoriesController();
    const auth = new Auth();

    router.route('/category')
        .get(auth.fnIsAuthenticated(), categoriesCtrl.fnGetCategories)
        .post(auth.fnIsAuthenticated(), categoriesCtrl.fnCreateCategory);
    router.route('/category/:id')
        .get(auth.fnIsAuthenticated(), categoriesCtrl.fnGetCategoryById)
        .put(auth.fnIsAuthenticated(), categoriesCtrl.fnUpdateCategory)
        .delete(auth.fnIsAuthenticated(), categoriesCtrl.fnDeleteCategory);
}
