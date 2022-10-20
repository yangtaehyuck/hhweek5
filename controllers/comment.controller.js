const CommentService = require("../services/comment.services");
const Joi = require('joi');
const re_comment = /^[\s\S]{1,100}$/

class CommentController {
  commentService = new CommentService();

  // 댓글 조회 "요청" (특정 게시글)
  getComments = async (req, res, next) => {
    const { postId } = req.params;
    const commentListUp = await this.commentService.findAllComment(postId);
    res.status(200).json({ data: commentListUp });
  };

  // 댓글 생성 "요청"
  createComment = async (req, res, next) => {

    const commentSchema = Joi.object({
      comment: Joi.string().pattern(re_comment).required(),
    });
    const { comment } = await commentSchema.validateAsync(req.body);
    const { postId } = req.params;
    const { userId, nickname } = res.locals.user;

    const createCommentData = await this.commentService.createCmt(
      comment,
      postId,
      userId,
      nickname
    );
    res.status(201).json({ data: createCommentData });

    
  };

  // 댓글 수정 "요청"
  updateComment = async (req, res, next) => {
    const { comment } = req.body;
    const { commentId } = req.params;
    const userId = res.locals.user.userId;
    if (comment === "") {
      res.json({ message: "댓글 내용을 입력해주세요, 줘패기 전에." });
    } else {
      const updateCommentDate = await this.commentService.updateCmt(
        comment,
        commentId,
        userId
      );
      res.status(201).json({ message: updateCommentDate });
    }
  };

  // 댓글 삭제 "요청"
  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const userId = res.locals.user.userId;

    const deleteCommentDate = await this.commentService.deleteCmt(
      commentId,
      userId
    );
    res.status(200).json({ message: deleteCommentDate });
  };
}

module.exports = CommentController;
