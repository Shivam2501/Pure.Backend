'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const express = require('express');
const middleware = require('./utils/middleware');
const routes = require('./routes');

const app = express();

/*=====  End of MODULES  ======*/

middleware(app);
routes(app);

module.exports = app;

