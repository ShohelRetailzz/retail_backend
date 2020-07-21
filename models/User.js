const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize} = require('../config');

class User extends Model {}

module.exports = User.init({
  // Model attributes are defined here
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
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});