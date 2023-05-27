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
  console.log("🚀 ~ file: commentController.js:20 ~ createComment ~ rate, content:", rate, content)
  let comment = await Comment.create({
    rate,
    content,
  });

  return comment;
};

const deleteComment = async (id) => {
  let removedComment = await Comment.destroy({
    where: { id },
  });

  return removedComment;
};

const updateComment = async (rate, content) => {
  let data = { name, price, description, rating, image };
  let newData = {};

  for (el in data) {
    if (data[el] !== "" || data[el] !== null || data[el] !== "undefined") {
      newData[el] = data[el];
    }
  }
  let updatedComment = await Comment.update({ newData }, { name });

  return updatedComment;
};

module.exports = {
  createComment,
  getComments,
  getCommentByID,
  deleteComment,
  updateComment,
};
