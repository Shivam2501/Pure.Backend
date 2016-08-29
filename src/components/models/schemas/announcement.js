'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const Sequelize = require('sequelize');

/*=====  End of MODULES  ======*/

module.exports = function Announcements(sequelize) {

    const tablename = 'announcements';

    const Announcement = sequelize.define(tablename, {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: Sequelize.TEXT,
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

    return Announcement;
};