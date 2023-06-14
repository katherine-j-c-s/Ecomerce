const {
  createComment,
  getComments,
  getCommentByID,
  deleteComment,
  updateComment,
} = require("../controllers/commentController");

const getCommentsHandler = async (req, res) => {
  try {
    const getAllComments = await getComments();
    res.status(200).json(getAllComments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCommentByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await getCommentByID(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postCommentHandler = async (req, res) => {
  try {
    const { rate, content } = req.body;
    const commentCreate = await createComment(rate, content);
    res.status(200).json(commentCreate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCommentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await deleteComment(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCommentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { rate, content } = req.body;
    const commentUpdate = await updateComment(id, rate, content);
    res.status(200).json(commentUpdate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getCommentsHandler,
  getCommentByIdHandler,
  postCommentHandler,
  deleteCommentHandler,
  updateCommentHandler,
};
