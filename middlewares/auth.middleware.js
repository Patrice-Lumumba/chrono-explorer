const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret';

const authToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
}

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès interdit' });
  }
  next();
}

// Middleware to check if the user is a moderator

const authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Accès interdit' });
    }
    next();
  };
};

module.exports = { authToken, isAdmin, authRole };