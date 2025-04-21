const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Event = require('./events');

const Media = sequelize.define('Media', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.ENUM('image', 'video', 'document'),
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        // allowNull: false
    },
    file_url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    event_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Event, // 'events' would be the table name
            key: 'id'
        },
    }
}, {
    // Other model options go here
    tableName: 'media',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

Media.belongsTo(Event, { foreignKey: 'event_id' });

module.exports = Media;