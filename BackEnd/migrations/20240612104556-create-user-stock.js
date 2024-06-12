'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_stock', {
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
      stock_name: {
        type: Sequelize.TEXT
      },
      stock_price: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      stock_count: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      buy_price: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      sell_price: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      gain_or_loss: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      profit_ratio: {
          type: Sequelize.FLOAT,
          defaultValue: null
      }
    }, {
        timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_stock');
  }
};