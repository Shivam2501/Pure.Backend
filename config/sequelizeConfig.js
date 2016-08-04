'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

require('dotenv').config();
const env = require('./' + process.env.NODE_ENV);

/*=====  End of MODULES  ======*/

let sequelizeConfig = {
    [process.env.NODE_ENV]: {
        url: env.database.url,
        dialect: env.database.engine
    }
};

module.exports = sequelizeConfig;