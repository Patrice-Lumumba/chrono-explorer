const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Event = require('./events');

const Favorite = sequelize.define('Favorite', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    event_id: {
        type: DataTypes.INTEGER,
        // references: {
        //     model: Event, // 'events' would be the table name
        //     key: 'id'
        // },
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