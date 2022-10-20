const CommentRepository = require("../repositories/comment.repository");

class CommentService {
  commentRepository = new CommentRepository();
  // 댓글 조회
  findAllComment = async (postId) => {
    const allComment = await this.commentRepository.findAllComment(postId);

    return allComment.map((comment) => {      
      return {
        commentId: comment.commentId,
        nickname: comment.nickname,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });
  };
  // 댓글 생성
  createCmt = async (comment, postId, userId, nickname) => { 
    const createCommentData = await this.commentRepository.createCmt(
      comment,
      postId,
      userId,
      nickname
    );

    return {  
      postId: createCommentData.postId,
      nickname: createCommentData.nickname,
      comment: createCommentData.comment,
      createdAt: createCommentData.createdAt,
      updatedAt: createCommentData.updatedAt,
    };
  };

  //댓글 수정
  updateCmt = async (comment, commentId, userId) => {
    const FindCmt = await this.commentRepository.findCmtById(commentId)
    
    if (userId === FindCmt.user) {
      await this.commentRepository.updateCmt(comment, commentId, userId)
      return "댓글을 수정하였습니다."
    } else { return "수정 권한이 없습니다" };
  };
  
  // 댓글 삭제
  deleteCmt = async (commentId, userId) => {
    const FindCmt = await this.commentRepository.findCmtById(commentId)
    
    if (userId === FindCmt.user) {
      await this.commentRepository.deleteCmt(commentId, userId)
      return "댓글을 삭제하였습니다."
    } else { return "삭제 권한이 없습니다" };
  };
}

module.exports = CommentService;
