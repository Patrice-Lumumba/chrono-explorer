const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Period = sequelize.define('Period', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        // allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        // allowNull: false
    }
},{
    
    timestamps: true,
    tableName: 'periods',
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Period;