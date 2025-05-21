const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Event = require('./events');

const Favorite = sequelize.define('Favorite', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    event_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Event,
            key: 'id'
        },
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'favorites',
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'event_id']
        }
    ]
});

Favorite.belongsTo(User, { foreignKey: 'user_id' });
Favorite.belongsTo(Event, { foreignKey: 'event_id' });

module.exports = Favorite;