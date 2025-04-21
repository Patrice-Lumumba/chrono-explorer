const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  name: DataTypes.STRING,
});

const Profile = sequelize.define('Profile', {
  bio: DataTypes.TEXT,
});

User.hasOne(Profile);
Profile.belongsTo(User);

sequelize.sync();
