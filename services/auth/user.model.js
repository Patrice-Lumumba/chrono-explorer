const {DataTypes} = require('sequelize');
const sequelize = require('../../config/db');

const User = sequelize.define('user', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {

    // Other model options go here
    // tableName: 'users',
    timestamps: true
});

sequelize.sync({force: true})


module.exports = User;