const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const Student = sequelize.define('Student', {
  name: DataTypes.STRING,
});

const Course = sequelize.define('Course', {
  title: DataTypes.STRING,
});

const Enrollment = sequelize.define('Enrollment', {
  grade: DataTypes.STRING,
});

Student.belongsToMany(Course, { through: Enrollment });
Course.belongsToMany(Student, { through: Enrollment });

sequelize.sync();
