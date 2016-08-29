'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const sessionAuth = require('../components/policies/sessionAuth');
const jwtAuth = require('../components/policies/jwtAuth');
const mentorAuth = require('../components/policies/mentorAuth');
const menteeAuth = require('../components/policies/menteeAuth');

/*=====  End of MODULES  ======*/


/*===============================
 =            ROUTERS            =
 ===============================*/

const UserRouter = require('./users');
const MentorRouter = require('./mentors');
const MenteeRouter = require('./mentees');
const MainRouter = require('./main');
const AdminRouter = require('./admin');

/*=====  End of ROUTERS  ======*/

module.exports = function Routes(app) {

    const userRoutes = UserRouter();
    const mentorRoutes = MentorRouter();
    const menteeRoutes = MenteeRouter();
    const mainRoutes = MainRouter();
    const adminRoutes = AdminRouter();

    /**
     * User Profile Routes
     */
    app.use('/users', userRoutes);

    /**
     * Main Website Routes
     */
    app.use('/main', mainRoutes);

    /**
     * Mentor Dashboard Routes
     */
    app.use('/mentors', jwtAuth, sessionAuth, mentorAuth, mentorRoutes);

    /**
     * Mentee Dashboard Routes
     */
    app.use('/mentees', jwtAuth, sessionAuth, menteeAuth, menteeRoutes);

    /**
     * Admin Dashboard Routes
     */
    app.use('/admin', jwtAuth, sessionAuth, adminRoutes);
};