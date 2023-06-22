const { Comment, Product, User } = require("../db");

const getComments = async () => {
  const comments = await Comment.findAll();
  if (comments.length === 0) {
    throw new Error("No comments found.");
  }
  return comments;
};

const getCommentByID = async (id) => {
  const comment = await Comment.findOne({
    where: { id },
  });

  return comment;
};

const createComment = async (id, rate, content, idUsuario) => {
  const comment = await Comment.create({
    rate,
    content,
  });

  const product = await Product.findByPk(id);
  const user = await User.findByPk(idUsuario);

  await comment.setUser(user);
  await comment.setProduct(product);

  return comment;
};

const deleteComment = async (id) => {
  const removedComment = await Comment.destroy({
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
