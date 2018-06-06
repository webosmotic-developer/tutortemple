import * as express from 'express';

import fnAuthRoutes from './auth/auth.route';

export default function fnSetRoutes(app) {

    const router = express.Router();

    fnAuthRoutes(router);

    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
