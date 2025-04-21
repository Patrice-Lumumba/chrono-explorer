const { Media } = require('../models');

exports.getAll = async (req, res) => {
  const media = await Media.findAll();
  res.json(media);
};

exports.getById = async (req, res) => {
  const item = await Media.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ message: 'Not found' });
};

exports.create = async (req, res) => {
  const newItem = await Media.create(req.body);
  res.status(201).json(newItem);
};

exports.update = async (req, res) => {
  const item = await Media.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  await item.update(req.body);
  res.json(item);
};

exports.delete = async (req, res) => {
  const deleted = await Media.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
};
