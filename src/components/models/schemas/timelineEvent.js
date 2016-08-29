'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const Sequelize = require('sequelize');

/*=====  End of MODULES  ======*/

module.exports = function TimelineEvents(sequelize) {

    const tablename = 'events';

    const TimelineEvent = sequelize.define(tablename, {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        'timeline_id': {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'timelines',
                key: 'id'
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        time: {
            type: Sequelize.STRING,
            allowNull: true
        },
        location: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        }
    }, {
        timestamps: true
    });

    return TimelineEvent;
};