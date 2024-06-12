'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('my_stock', {
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
      buy_money: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      sell_money: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      stock_count: {
          type: Sequelize.BIGINT,
          defaultValue: null
      }
    }, {
        timestamps: false
    }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('my_stock');
  }
};