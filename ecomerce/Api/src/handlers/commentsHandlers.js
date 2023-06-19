const {
  createComment,
  getComments,
  getCommentByID,
  deleteComment,
  updateComment,
} = require("../controllers/commentController");
const getCommentsHandler = async (req, res) => {
  try {
    let getAllComments = await getComments();
    res.status(200).json(getAllComments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postCommentHandler = async (req, res) => {
  try {
    let { id, rate, content, idUsuario } = req.body;
    let commentCreate = await createComment(id, rate, content, idUsuario);
    res.status(200).json(commentCreate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCommentHandler = async (req, res) => {
  try {
    let { id } = req.params;
    let comment = await deleteComment(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCommentHandler = async (req, res) => {
  try {
    let { id } = req.params;
    let { rate, content } = req.body;
    let commentUpdate = await updateComment(id, rate, content);
    res.status(200).json(commentUpdate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getCommentsHandler,
  postCommentHandler,
  deleteCommentHandler,
  updateCommentHandler,
};
