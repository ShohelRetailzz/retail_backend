const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize} = require('../config');

class AuditTrail extends Model {}

module.exports = AuditTrail.init({
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true
  },
  company_code: {
  	type: Sequelize.STRING(10),
  },
  table_name: {
  	type: Sequelize.STRING(60),
  },
  KEY_INFO: {
  	type: Sequelize.STRING(50),
  },
  field_name: {
  	type: Sequelize.STRING(60),
  },
  old_data: {
  	type: Sequelize.STRING(60),
  },
  new_data: {
  	type: Sequelize.STRING(60),
  },
  employee_code: {
  	type: Sequelize.STRING(20)
  },
  time_stamp: Sequelize.DATE,
  status: {
    type: Sequelize.TINYINT(1),
    defaultValue: 1,
    comment: "0=suspended,1=active,2=pending"
    // allowNull defaults to true
  },
  delete_cd: {
    type: Sequelize.STRING(1),
    defaultValue: "Y",
    comment: "Y=live, N=deleted"
  },
  ip: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  user: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'AuditTrail', // We need to choose the model name
  tableName: 'audit_trail'
});