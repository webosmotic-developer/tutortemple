import * as express from 'express';

import fnAuthRoutes from './auth/auth.route';
import fnUsersRoutes from './api/users/users.route';
import fnCategoriesRoutes from './api/categories/categories.route';

export default function fnSetRoutes(app) {

    const router = express.Router();

    fnAuthRoutes(router);
    fnUsersRoutes(router);
    fnCategoriesRoutes(router);

    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
