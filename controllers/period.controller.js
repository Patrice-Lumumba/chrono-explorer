const { or } = require('sequelize');
const { Period } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const periods = await Period.findAll();
        res.status(200).json(periods);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving periods', error });
    }
}

exports.getById = async (req, res) => {
    try {
        const period = await Period.findByPk(req.params.id);
        if (!period) {
            return res.status(404).json({ message: 'Period not found' });
        }
        res.status(200).json(period);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving period', error });
    }
}

exports.create = async (req, res) => {
    try {
        const period = await Period.create(req.body);
        res.status(201).json(period);
    } catch (error) {
        res.status(500).json({ message: 'Error creating period', error });
    }
}

exports.update = async (req, res) => {
    try {
        const period = await Period.findByPk(req.params.id);
        if (!period) {
            return res.status(404).json({ message: 'Period not found' });
        }
        await period.update(req.body);
        res.status(200).json(period);
    } catch (error) {
        res.status(500).json({ message: 'Error updating period', error });
    }
}

exports.delete = async (req, res) => {
    try {
        const period = await Period.findByPk(req.params.id);
        if (!period) {
            return res.status(404).json({ message: 'Period not found' });
        }
        await period.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting period', error });
    }
}

exports.getByEvent = async (req, res) => {
    try {
        const periods = await Period.findAll({
            
            order: [['start_date', 'ASC']]
        });
        
        res.status(200).json(periods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving periods', error });
    }

}