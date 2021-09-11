'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
      },
      catName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      status: {
        type: Sequelize.TINYINT(1),
        comment: "0=suspended,1=active,2=pending"
        // allowNull defaults to true
      },
      delete_cd: {
        type: Sequelize.STRING(1),
        defaultValue: "Y",
        comment: "Y=live, N=deleted"
      },
      ip: {
        type: Sequelize.STRING(32),
        allowNull: true
      },
      user: {
        type: Sequelize.STRING(14),
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categories');
  }
};
