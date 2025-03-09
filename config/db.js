
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  // process.env.DB_PORT,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    // port: process.env.DB_PORT,
    logging: false
  }
);


sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

module.exports = sequelize;