'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
      },
      fullname: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true
        // allowNull defaults to true
      },
      password: {
        type: Sequelize.STRING(128)
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
    await queryInterface.dropTable('users');
  }
};
