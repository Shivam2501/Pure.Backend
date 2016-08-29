'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const Sequelize = require('sequelize');
const timelineEvent = require('./timelineEvent');

/*=====  End of MODULES  ======*/

module.exports = function Timelines(sequelize) {

    const tablename = 'timelines';

    const Timeline = sequelize.define(tablename, {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        term: {
            type: Sequelize.STRING,
            unique: true,
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

    Timeline.hasMany(timelineEvent(sequelize), {foreignKey: 'timeline_id'});

    return Timeline;
};