const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Event = require('./events');


const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
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
    },
    isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'comments'
});

Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Event, { foreignKey: 'event_id' });

module.exports = Comment;