const User = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ username: req.body.username, password: hashedPassword });
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try{
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if(!user || !(await bcrypt.compare(req.body.password, user.password))){
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
};