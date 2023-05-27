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
    let { rate, content } = req.body;
    let commentCreate = await createComment(rate, content);
    res.status(200).json(commentCreate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCommentHandler = async (req, res) => {
  res.send("Estoy eliminando un Comment ");
};

const updateCommentHandler = async (req, res) => {
  res.send("Estoy actualizando un Comment ");
};

module.exports = {
  getCommentsHandler,
  postCommentHandler,
  deleteCommentHandler,
  updateCommentHandler,
};
