'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('answers', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      'application_id': {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'applications',
          key: 'id'
        }
      },
      'question_id': {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'mentorQuestions',
          key: 'id'
        }
      },
      answer: {
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
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('answers');
  }
};
