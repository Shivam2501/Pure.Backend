'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('applications', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      'mentor_id': {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'mentors',
          key: 'id'
        }
      },
      'mentee_id': {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'mentees',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.ENUM,
        values: ['ACCEPTED', 'DECLINED', 'PENDING', 'NOT_COMPLETED'],
        defaultValue: 'NOT_COMPLETED',
        allowNull: false
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
    return queryInterface.dropTable('applications');
  }
};
