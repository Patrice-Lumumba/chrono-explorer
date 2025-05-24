const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
// const Event = require('./events');

const User = sequelize.define('Users', {
    // Model attributes are defined here
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user', 'moderator'),
        defaultValue: 'user'
    },
},{
    // Other model options go here
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

// sequelize.sync({force: true})

// User.belongsToMany(Event, { as: 'favorites', through: 'Favorite', foreignKey: 'user_id' });
module.exports = User;