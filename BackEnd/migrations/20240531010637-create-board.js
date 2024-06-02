'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('boards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
        },
      login_id: {
        type: Sequelize.INTEGER
      },
      author: {
          type: Sequelize.STRING
      },
      title: {
          type: Sequelize.STRING
      },
      content: {
          type: Sequelize.TEXT('medium')
      },
      isNotice: {
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
    await queryInterface.dropTable('boards');
  }
};