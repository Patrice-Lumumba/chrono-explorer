const { Comment, User } = require('../models');
const commentService = require('../services/comment.service');
const { NotFoundError } = require('../utils/errorHandler');

exports.getAll = async (req, res) => {
  const comments = await commentService.getAllComments();

  res.json(comments);
};

exports.getById = async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  comment ? res.json(comment) : res.status(404).json({ message: 'Not found' });
};

exports.create = async (req, res) => {

  try{
    const { event_id, content, user_id, isApproved } = req.body;
    // const userId = req.user.id; // Assuming you have user ID from the request 

    const newComment = await Comment.create({
      event_id,
      content,
      user_id,
      isApproved
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error creating comment', error });
  }
};

exports.getByEvent = async(req, res) => {
  const { event_id } = req.params.eventId;

  const comments = await Comment.findAll({
    where: { event_id, status: 'approved' },
    include: [{ model: User, as: 'user' }]
  });
  res.json(comments);
};

// admin role
exports.update = async (req, res) => {
  const {status} = req.body;
  const {id} = req.params;

  const comment = await Comment.findByPk(id);
  if (!comment) return res.status(404).json({ message: 'Not found' });

  comment.status = status;
  await comment.save();

  res.json({message: "Comment updated successfully", comment});
};

// Get pending comments

exports.getPending = async (req, res) => {
  const comments = await Comment.findAll({ where: { isApproved: false } });
  res.json(comments);
}

// Comment for a specific event
// GET /events/:eventId/comments
// Get all comments for a specific event

exports.getCommentsByEvent = async (req, res) => {
  const { eventId } = req.params;

  const approvedComments = !req.user || !['admin'].includes(req.user.role);
  const comments = await Comment.findAll({ where: { event_id: eventId, isApproved: approvedComments } });
  res.json(comments);
};


// Approve a comment
exports.approve = async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Comment Not found' });
  await comment.update({ isApproved: true });
  res.json(comment);
  
};


exports.updateStatus = async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Comment Not found' });
  await comment.update({ status: req.body.status });
  res.json(comment);
};

exports.delete = async (req, res) => {
  const deleted = await Comment.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
};

// module.exports = {
//   getAll,
//   getById,
//   create,
//   getByEvent,
//   update,
//   getPending,
//   getCommentsByEvent,
//   approve,
//   updateStatus,
//   delete
// };
