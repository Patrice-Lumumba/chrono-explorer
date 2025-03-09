const {DataTypes} = require('sequelize');
const sequelize = require('../../config/db');

const Archive = sequelize.define('Archive', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.DATE,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
    },
},{timestamps: true});

sequelize.sync({force: true})

module.exports = Archive;