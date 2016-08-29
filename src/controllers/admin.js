/**
 * Created by shivambharuka on 8/28/16.
 */
'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const _ = require('lodash');
const handles = require('../components/services/response');
const log = require('../utils/logging');
const rules = require('../components/models/rules');
const error = require('./error');

/*=====  End of MODULES  ======*/

/*===============================
 =            MODELS             =
 ===============================*/

const Models = require('../components/models/schemas');

/*=====  End of MODELS  ======*/

module.exports = class admin {

    constructor() {
        this.Timelines = Models.Timelines;
        this.TimelineEvents = Models.TimelineEvents;
        this.Applications = Models.Applications;
        this.Announcements = Models.Announcements;
        this.Error = new error();
    }

    /**
     * Create a new timeline
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    createTimeline(req, res) {
        return this.Timelines.create(req.body).then(timeline => {
            return handles.SUCCESS(res, 'Timeline Successfully Created', timeline);
        }).catch(err => {
            this.Error.handler(res, err, 'Admin: Timeline could not be added');
        })
    }

    /**
     * Get all Timelines
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    getTimeline(req, res) {
        let query = {
            include: [
                {
                    model: this.TimelineEvents,
                }
            ]
        };

        return this.Timelines.findAll(query).then(timelines => {
            return handles.SUCCESS(res, `Timelines returned Successfully`, timelines);
        }).catch(err => {
            this.Error.handler(res, err, 'Admin: Timelines not returned');
        })
    }

    /**
     * Add an event
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    addEvent(req, res) {
        return this.TimelineEvents.create(req.body).then(event => {
            return handles.SUCCESS(res, 'Event Successfully Created', event);
        }).catch(err => {
            this.Error.handler(res, err, 'Admin: Event could not be added');
        })
    }

    /**
     * Update an event
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    updateEvent(req, res) {
        return this.TimelineEvents.update(
            req.body,
            {where: {id: req.params.id}}
        ).then(event => {
            return handles.SUCCESS(res, 'Event Updated Successfully', event);
        }).catch(err => {
            this.Error.handler(res, err, 'Admin: Event could not be updated');
        })
    }

    /**
     * Remove an event
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    removeEvent(req, res) {
        return this.TimelineEvents.destroy({
            where: {id: req.params.id}
        }).then(event => {
            return handles.SUCCESS(res, 'Event Deleted Successfully', event);
        }).catch(err => {
            this.Error.handler(res, err, 'Admin: Event Not Deleted Successfully');
        })
    }

    /**
     * Return all applications
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    receivedApplications(req, res) {
        return this.Applications.findAll({
            where: {status: {$not: ["NOT_COMPLETED", "PENDING"]}}
        }).then(applications => {
            return handles.SUCCESS(res, 'Applications Returned Successfully', applications);
        }).catch(err => {
            this.Error.handler(res, err, 'Admin: Applications not found');
        })
    }

    /**
     * Get all announcements
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    getAnnouncement(req, res) {
        return this.Announcements.findAll().then(announcements => {
            return handles.SUCCESS(res, 'Announcements Successfully Returned', announcements);
        }).catch(err => {
            this.Error.handler(res, err, 'Admin: Announcements could not be returned');
        })
    }

    /**
     * Add an announcement
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    addAnnouncement(req, res) {
        return this.Announcements.create(req.body).then(announcement => {
            return handles.SUCCESS(res, 'Announcement Successfully Created', announcement);
        }).catch(err => {
            this.Error.handler(res, err, 'Admin: Announcement could not be added');
        })
    }

    /**
     * Update an announcement
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    updateAnnouncement(req, res) {
        return this.Announcements.update(
            req.body,
            {where: {id: req.params.id}}
        ).then(announcement => {
            return handles.SUCCESS(res, 'Announcement Updated Successfully', announcement);
        }).catch(err => {
            this.Error.handler(res, err, 'Admin: Announcement could not be updated');
        })
    }

    /**
     * Remove an announcement
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    removeAnnouncement(req, res) {
        return this.Announcements.destroy({
            where: {id: req.params.id}
        }).then(announcement => {
            return handles.SUCCESS(res, 'Announcement Deleted Successfully', announcement);
        }).catch(err => {
            this.Error.handler(res, err, 'Admin: Announcement Not Deleted Successfully');
        })
    }

};
