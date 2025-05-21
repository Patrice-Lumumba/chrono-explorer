const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret'; // À stocker dans un fichier .env

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword, role });
    res.status(201).json({ message: 'Utilisateur créé', user: { id: user.id, username, email, role } });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l’enregistrement', error });
  }
};

exports.login = async (req, res) => {
    console.log('Login payload:', req.body);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '24h' });

    res.json({ message: 'Connexion réussie', token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error });
  }
};

// Give the user a role
exports.giveRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.role = role;
    await user.save();

    res.json({ message: 'Rôle attribué', user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l’attribution du rôle', error });
  }
};
