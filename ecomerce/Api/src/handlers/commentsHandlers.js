const getCommentsHandler = (req, res) => {
  res.send("Estoy llevando todos los Comments");
};

const postCommentHandler = (req, res) => {
  res.send("Estoy creando un Comment ");
};

const deleteCommentHandler = (req, res) => {
  res.send("Estoy eliminando un Comment ");
};

const updateCommentHandler = (req, res) => {
  res.send("Estoy actualizando un Comment ");
};

module.exports = {
  getCommentsHandler,
  postCommentHandler,
  deleteCommentHandler,
  updateCommentHandler,
};
