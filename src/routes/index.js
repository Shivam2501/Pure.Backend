'use strict';

/*===============================
 =            MODULES            =
 ===============================*/


/*=====  End of MODULES  ======*/


/*===============================
 =            ROUTERS            =
 ===============================*/

const UserRouter = require('./users');

/*=====  End of ROUTERS  ======*/

module.exports = function Routes(app) {

    const userRoutes = UserRouter();

    app.use('/users', userRoutes);
};