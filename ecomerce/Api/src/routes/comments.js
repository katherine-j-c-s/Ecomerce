const { Router } = require("express");

const commentsRouter = Router();

commentsRouter.get("/", getCommentsHandler);

commentsRouter.delete("/:id", deletCommentHandler);

commentsRouter.post("/", creatCommentHandler);

commentsRouter.patch("/:id", updatCommentHandler);

module.exports = commentsRouter;
