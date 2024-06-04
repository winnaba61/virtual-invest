'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: {
          type: Sequelize.STRING
      },
      user_id: {
          type: Sequelize.STRING
      },
      user_passwd: {
          type: Sequelize.STRING
      },
        user_birth: {
            type: Sequelize.STRING
      },
      user_email: {
          type: Sequelize.STRING
        },
      user_phone: {
          type: Sequelize.STRING
      },
      user_admin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      createdAt: {
        allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
      }
    }, {
        timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('logins');
  }
};