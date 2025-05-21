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
        allowNull: false,
        validate: {
            isIn: {
                args: [['image', 'video', 'document']],
                msg: "Type must be either 'image', 'video', or 'document'"
            },
            notEmpty: true
        }
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
    },
    uploader_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'ID of the user who uploaded the media'
  }

}, {
    // Other model options go here
    tableName: 'media',
    indexes: [
        {
            fields: ['event_id']
        },
        {
            fields: ['type']
        },
    ],
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

// Media.belongsTo(Event, { foreignKey: 'event_id' });

module.exports = Media;