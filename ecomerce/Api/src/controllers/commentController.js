const { Comment } = require("../db");

const getComments = async () => {
  let comments = await Comment.findAll();
  if (comments.length === 0) {
    throw new Error("No se encontraron comentarios");
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

  return comment;
};

const deleteComment = async (id) => {
  const comment = await User.findByPk(id);

  if (comment) {
    await comment.destroy();
    return "Comentario eliminado con éxito";
  } else {
    throw new Error("Comentario no encontrado");
  }
};

const updateComment = async (id, rate, content) => {
  const comment = await Comment.findByPk(id);
  if (comment) {
    comment.rate = rate || comment.rate;
    comment.content = content || comment.content;
    await comment.save();
    return comment;
  } else {
    throw new Error("Comentario no encontrado");
  }
};

module.exports = {
  createComment,
  getComments,
  getCommentByID,
  deleteComment,
  updateComment,
};
