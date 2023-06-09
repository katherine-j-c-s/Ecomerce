const { Comment } = require("../db");

const getComments = async () => {
  let comments = await Comment.findAll();
  if (comments.length === 0) {
    throw new Error("No comments found.");
  }
  return comments;
};

const getCommentByID = async (id) => {
  let comment = await Comment.findOne({
    where: { id },
  });

  return comment;
};

const createComment = async (rate, content) => {
  let comment = await Comment.create({
    rate,
    content,
  });
    console.log("commentController.js:24 rate, content,:", rate, content,)

  return comment;
};

const deleteComment = async (id) => {
  let removedComment = await Comment.destroy({
    where: { id },
  });

  return removedComment;
};

const updateComment = async (id, rate, content) => {
  const comment = await Comment.findByPk(id);
  if (comment) {
    comment.rate = rate || comment.rate;
    comment.content = content || comment.content;
    await comment.save();
    return comment;
  } else {
    throw new Error("Usuario no encontrado");
  }
};

module.exports = {
  createComment,
  getComments,
  getCommentByID,
  deleteComment,
  updateComment,
};
