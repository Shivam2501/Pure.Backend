'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('mentees', {
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
      netID: {
        type: Sequelize.STRING,
        allowNull: true
      },
      schoolYear: {
        type: Sequelize.ENUM,
        values: ['freshman', 'sophomore', 'junior', 'senior'],
        allowNull: true
      },
      gpa: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      workExperience: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      researchGoal: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      term: {
        type: Sequelize.STRING,
        allowNull: true
      },
      major: {
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
    return queryInterface.dropTable('mentees');
  }
};
