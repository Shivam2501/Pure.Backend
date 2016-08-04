'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const uuid = require('node-uuid');
const session = require('express-session');
const passport = require('passport');
const sessionConfig = require('../../config').session;

const helmet = require('helmet');
const hpp = require('hpp');

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const RedisStore = require('connect-redis')(session);
const SessionStore = new RedisStore({url: sessionConfig.url});

/*=====  End of MODULES  ======*/

module.exports = function Middleware(app) {

    /*==============================================
     =              SESSION MIDDLEWARE               =
     ===============================================*/

    const sessionOptions = {
        name: 'PURE.sid',
        genid: req => {
            return uuid.v4();
        },
        resave:            true,
        rolling:           true,
        saveUninitialized: false,
        store: SessionStore,
        secret: sessionConfig.secret
    };

    app.use(session(sessionOptions));

    app.use(passport.initialize());
    app.use(passport.session());

    /*====== End of SESSION MIDDLEWARE ======*/

    /*==============================================
     =              SECURITY MIDDLEWARE              =
     ===============================================*/

    /* Prevent XSS Attacks */
    app.use(helmet.xssFilter());
    /* Prevents click jacking */
    app.use(helmet.frameguard('deny'));
    /* Enforces users to use HTTPS (requires HTTPS/TLS/SSL) */
    // app.use(helmet.hsts({ maxAge: process.env.APP_HTTPS_TIMEOUT }));
    /* Hides x-powered-by header */
    app.use(helmet.hidePoweredBy());
    /* Prevent MIME type sniffing */
    app.use(helmet.noSniff());
    /* Disable Caching */
    app.use(helmet.noCache());
    /* Prevent Parameter Pollution */
    app.use(hpp());

    /*====== End of SECURITY MIDDLEWARE ======*/

    /*==============================================
     =              SERVER MIDDLEWARE                =
     ===============================================*/

    /* Enables CORS Headers */
    app.use('*', cors());
    /* parses cookies */
    app.use(cookieParser());
    /* Parses the request body */
    app.use(bodyParser.urlencoded({ extended: false }));
    /* Returns request body as JSON */
    app.use(bodyParser.json());
    /* GZIP everything */
    app.use(compression());

    /*====== End of SERVER MIDDLEWARE ======*/

};