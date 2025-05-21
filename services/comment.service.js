
const Comment = require('../models/comment');
const { NotFoundError } = require('../utils/errorHandler');

const createComment = async (commentData) => {
  return await Comment.create(commentData);
};


const getAllComments = async () => {
  return await Comment.findAll();
};


const getApprovedComments = async () => {
  return await Comment.findAll({ where: { isApproved: true } });
};


const getPendingComments = async () => {
  return await Comment.findAll({ where: { isApproved: false } });
};


const getCommentsByEvent = async (eventId, approvedOnly = true) => {
  const whereClause = { event_id: eventId };
  
  if (approvedOnly) {
    whereClause.isApproved = true;
  }
  
  return await Comment.findAll({ where: whereClause });
};


const approveComment = async (commentId) => {
  const comment = await Comment.findByPk(commentId);
  
  if (!comment) {
    throw new NotFoundError('Comment not found');
  }
  
  // The update method returns the updated instance(s)
  // Return the result of the update call directly
  const updatedComment = await comment.update({ isApproved: true });
  return updatedComment;
};

const rejectComment = async (id) => {
  const comment = await Comment.findByPk(id);

  if (!comment) {
    throw new NotFoundError('Comment not found');
  }
  
  await comment.destroy();
  return true;
};

const getCommentById = async (id) => {
  const comment = await Comment.findByPk(id);

  if (!comment) {
    throw new NotFoundError('Comment not found');
  }
  
  return comment;
};

module.exports = {
  createComment,
  getAllComments,
  getApprovedComments,
  getPendingComments,
  getCommentsByEvent,
  approveComment,
  rejectComment,
  getCommentById
};
