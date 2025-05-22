const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Media = require('./media');
const User = require('./user');

const Event = sequelize.define('Event', {
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

    // media_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: 'media', // 'media' would be the table name
    //         key: 'id'
    //     },
    // },
    }, {
        // Other model options go here
        tableName: 'events',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false
    }
);
// Event.belongsToMany(User, { as: 'users_favorited', through: 'Favorite', foreignKey: 'event_id' });
// Event.belongsToMany(Media, { through: 'Eventmedia', foreignKey: 'event_id' });
// Media.belongsToMany(Event, { through: 'Eventmedia', foreignKey: 'media_id' });

// sequelize.sync({force: true})

module.exports = Event;
