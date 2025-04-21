const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
};

exports.getById = async (req, res) => {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    user ? res.json(user) : res.status(404).json({ message: 'Not found' });
};