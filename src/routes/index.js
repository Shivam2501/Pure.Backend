'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const sessionAuth = require('../components/policies/sessionAuth');
const jwtAuth = require('../components/policies/jwtAuth');

/*=====  End of MODULES  ======*/


/*===============================
 =            ROUTERS            =
 ===============================*/

const UserRouter = require('./users');
const MentorRouter = require('./mentors');

/*=====  End of ROUTERS  ======*/

module.exports = function Routes(app) {

    const userRoutes = UserRouter();
    const mentorRoutes = MentorRouter();

    app.use('/users', userRoutes);
    app.use('/mentors', jwtAuth, sessionAuth, mentorRoutes);

};