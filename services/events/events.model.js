const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Event = sequelize.define('events', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    civilization: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
        timestamps: true
    }
);

sequelize.sync({force: true})

module.exports = Event;
