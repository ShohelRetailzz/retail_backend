'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('models', { 
      id: Sequelize.INTEGER,
      delete_cd: {
        type: Sequelize.STRING(1),
        defaultValue: "Y",
        comment: "Y=live, N=deleted"
      },
      date: Sequelize.DATEONLY
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
