'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stock_info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itmsNm: {
        type: Sequelize.TEXT
      },
      clpr: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      hipr: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      lopr: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      vs: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      basDt: {
          type: Sequelize.DATE,
          defaultValue: null
      },
      mkp: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      mrktTotAmt: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      lstgStCnt: {
          type: Sequelize.BIGINT,
          defaultValue: null
      },
      trqu: {
          type: Sequelize.BIGINT,
          defaultValue: null
      }
    }, {
        timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stock_info');
  }
};