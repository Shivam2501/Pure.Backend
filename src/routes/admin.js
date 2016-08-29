/**
 * Created by shivambharuka on 8/29/16.
 */
'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const checkit = require('../components/policies/checkJSON');
const rules = require('../components/models/rules');

/*=====  End of MODULES  ======*/

/*===============================
 =        CONTROLLERS            =
 ===============================*/

const AdminController = require('../controllers/admin');

/*=====  End of CONTROLLERS  ======*/

module.exports = function AdminRouter() {

    const router = require('express').Router();
    const admin = new AdminController();

    /*===============================
     =             ROUTES            =
     ===============================*/

    /**
     * Create a new timeline
     */
    router.post('/timeline', checkit({term: ['required']}), admin.createTimeline.bind(admin));

    /**
     * Get a timeline
     */
    router.get('/timeline', admin.getTimeline.bind(admin));

    /**
     * Create a new event
     */
    router.post('/event', admin.addEvent.bind(admin));

    /**
     * Update a event by id
     */
    router.put('/event/:id', admin.updateEvent.bind(admin));

    /**
     * Delete a event by id
     */
    router.delete('/event/:id', admin.removeEvent.bind(admin));

    /**
     * See all applications
     */
    router.get('/application', admin.receivedApplications.bind(admin));

    /**
    * Create a new announcement
    */
    router.post('/announcement', admin.addAnnouncement.bind(admin));

    /**
     * Update a announcement by id
     */
    router.put('/announcement/:id', admin.updateAnnouncement.bind(admin));

    /**
     * Delete a announcement by id
     */
    router.delete('/announcement/:id', admin.removeAnnouncement.bind(admin));

    /**
     * See all announcements
     */
    router.get('/announcement', admin.getAnnouncement.bind(admin));

    /*=====  End of ROUTES  ======*/

    return router;
};