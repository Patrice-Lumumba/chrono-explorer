require('dotenv').config()
const express = require('express');
// const cors = require('cors');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());
app.use('/api', routes);




app.get('/', (req, res) => {
  res.send('Welcome to the events API');
});

// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// sequelize.sync({force: true})

