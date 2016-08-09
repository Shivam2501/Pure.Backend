'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('mentors', 'major', {
            type: Sequelize.STRING,
            allowNull: true
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('mentors', 'major');
    }
};
