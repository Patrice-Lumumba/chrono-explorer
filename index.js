require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Importation des routes

const eventRoutes = require('./services/events/event.routes');
const archivesRoutes = require('./services/archives/archives.routes');
const authRoutes = require('./services/auth/auth.routes');
// const sequelize = require('./config/db');

app.use('/api/events', eventRoutes);
app.use('/api/archives', archivesRoutes);
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the events API');
});

// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// sequelize.sync({force: true})

