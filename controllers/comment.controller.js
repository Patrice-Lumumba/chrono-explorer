const { Comment } = require('../models');

exports.getAll = async (req, res) => {
  const comments = await Comment.findAll();
  res.json(comments);
};

exports.getById = async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  comment ? res.json(comment) : res.status(404).json({ message: 'Not found' });
};

exports.create = async (req, res) => {
  const newComment = await Comment.create(req.body);
  res.status(201).json(newComment);
};

exports.updateStatus = async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Not found' });
  await comment.update({ status: req.body.status });
  res.json(comment);
};

exports.delete = async (req, res) => {
  const deleted = await Comment.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
};
