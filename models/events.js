const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Period = require('./period'); // Adjust the path as necessary

const Event = sequelize.define('Event', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    date_start: {
        type: DataTypes.STRING(50),
        // allowNull: false
    },
    date_end: {
        type: DataTypes.STRING(50),
        // allowNull: false
    },
    location: {
        type: DataTypes.STRING(100),
    },
    civilization: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    image_url: {
        type: DataTypes.STRING(255),
        // allowNull: true
    },
    period_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'periods', // 'periods' would be the table name
            key: 'id'
        },
    },
    }, {
        // Other model options go here
        tableName: 'events',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false
    }
);

Event.belongsTo(Period, { foreignKey: 'period_id' });

// sequelize.sync({force: true})

module.exports = Event;
