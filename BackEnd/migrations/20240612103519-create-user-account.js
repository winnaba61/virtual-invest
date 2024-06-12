'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_account', {
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
      user_wallet: {
          type: Sequelize.BIGINT,
          defaultValue: null
      }
    },{
        timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_account');
  }
};