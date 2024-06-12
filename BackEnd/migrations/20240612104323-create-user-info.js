'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_account: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      user_password: {
        type: Sequelize.TEXT
      },
      user_name: {
        type: Sequelize.TEXT
      },
      user_email: {
        type: Sequelize.TEXT
      },
      user_phone: {
        type: Sequelize.TEXT
      },
      user_birth: {
          type: Sequelize.DATE,
          defaultValue: null
      },
    }, {
        timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_info');
  }
};