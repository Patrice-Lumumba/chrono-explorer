const { Event } = require('../models');

exports.getAll = async (req, res) => {
  const events = await Event.findAll({  });
  res.json(events);
};

exports.getById = async (req, res) => {
  const event = await Event.findByPk(req.params.id, { include: 'period' });
  event ? res.json(event) : res.status(404).json({ message: 'Not found' });
};

exports.create = async (req, res) => {
  const newEvent = await Event.create(req.body);
  res.status(201).json(newEvent);
};

exports.update = async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ message: 'Not found' });
  await event.update(req.body);
  res.json(event);
};

exports.delete = async (req, res) => {
  const deleted = await Event.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
};
