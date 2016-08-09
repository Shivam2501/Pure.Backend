'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('mentors', {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            'user_id': {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            aboutMe: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            project: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            coursework: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            term: {
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
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('mentors');
    }
};
