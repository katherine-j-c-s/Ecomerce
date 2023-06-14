const { Router } = require("express");

const {
  getCommentsHandler,
  getCommentByIdHandler,
  postCommentHandler,
  deleteCommentHandler,
  updateCommentHandler,
} = require("../handlers/commentsHandlers");

const commentsRouter = Router();

commentsRouter.get("/", getCommentsHandler);

commentsRouter.get("/:id", getCommentByIdHandler);

commentsRouter.delete("/:id", deleteCommentHandler);

commentsRouter.post("/", postCommentHandler);

commentsRouter.patch("/:id", updateCommentHandler);

module.exports = commentsRouter;
