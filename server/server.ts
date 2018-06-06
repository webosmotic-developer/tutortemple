// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import {enableProdMode} from '@angular/core';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as passport from 'passport';
import * as fs from 'fs';
import * as moment from 'moment';
import {join} from 'path';

import fnSetRoutes from './routes';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 3000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('../dist/server/main');

// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

/*----- START: Logs File Configuration -----*/
const LOGS_DIR_PATH = join(process.cwd(), 'logs/');
const CURRENT_DATE_FORMAT = 'YYYY_MM_DD';
if (!fs.existsSync(LOGS_DIR_PATH)) {
    fs.mkdirSync(LOGS_DIR_PATH);
}
const fnHookSTD = (std, callback, type): any => {
    std.write = (() => {
        return (string): any => {
            callback(string, type);
        };
    })();
};

const fnWriteLog = (s, type) => {
    const PP_CMD_LOGS_FILE_NAME = 'PP_LOGS_' + moment().utc().format(CURRENT_DATE_FORMAT) + '.txt';
    const access = fs.createWriteStream(LOGS_DIR_PATH + PP_CMD_LOGS_FILE_NAME, {flags: 'a+', encoding: 'utf8'});
    const dateFormat = moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS');
    const msg = s.replace(/\[0m/gi, '').replace(//gi, '').replace(/\[3[0-9]m/gi, '');
    access.write(' [' + dateFormat + '] ' + '[' + type + '] ' + msg);
};

fnHookSTD(process.stdout, fnWriteLog, 'INFO');
fnHookSTD(process.stderr, fnWriteLog, 'ERROR');
app.get('/logs', function (req, res) {
    let DATE = moment().utc().format(CURRENT_DATE_FORMAT);
    if (req.query.date) {
        DATE = moment(req.query.date, CURRENT_DATE_FORMAT).format(CURRENT_DATE_FORMAT);
    }
    if (DATE === 'Invalid date') {
        res.status(500).send('Invalid date. Please try YYYY/MM/DD or YYYY-MM-DD');
    }
    const FILE_NAME = 'PP_LOGS_' + DATE + '.txt';
    if (fs.existsSync(LOGS_DIR_PATH + FILE_NAME)) {
        res.sendFile(LOGS_DIR_PATH + FILE_NAME);
    } else {
        res.status(500).send('Logs file not available for date ' + DATE + '.');
    }

});
/*----- END: Logs File Configuration -----*/

// Set API routing
fnSetRoutes(app);

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
    res.render('index', {req});
});

// Start up the Node server
app.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
});

/*----- START: Node Process events for get exceptions -----*/
process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'UNHANDLED REJECTION AT PROMISE', p);
    })
    .on('rejectionHandled', (p) => {
        console.error('REJECTION UNHANDLED', p);
    })
    .on('uncaughtException', (err) => {
        console.error('UNCAUGHT EXCEPTION : ', err);
    })
    .on('warning', (warning) => {
        console.error('WARNING : ', warning);
    });
/*----- END: Node Process events for get exceptions -----*/

export {app};
