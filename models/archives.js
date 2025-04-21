const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Archive = sequelize.define('archives', {
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
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // Relations with other models
},{timestamps: true});

sequelize.sync({force: true})

module.exports = Archive;