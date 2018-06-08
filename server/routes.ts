import * as express from 'express';

import fnAuthRoutes from './auth/auth.route';
import fnUsersRoutes from './api/user/user.route';
import fnCategoriesRoutes from './api/category/category.route';
import fnSubjectRoutes from './api/subject/subject.route';

export default function fnSetRoutes(app) {

    const router = express.Router();

    fnAuthRoutes(router);
    fnUsersRoutes(router);
    fnCategoriesRoutes(router);
    fnSubjectRoutes(router);

    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
