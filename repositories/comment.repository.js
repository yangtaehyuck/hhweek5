const { comments } = require("../models"); // DB영역에서는 꼭 필요한 존재.

class CommentRepository {
  constructor() {
    this.comments = comments;
  }

  // 댓글 조회
  findAllComment = async ({ postId }) => {    
    const allComment = await this.comments.findAll({
      where: { postId },
      attributes: { exclude: ["postId"] }, order: [['createdAt', 'DESC']]
    });

    return allComment;
  };
  // 댓글 생성
  createCmt = async ({ comment, postId, userId, nickname }) => {
    const createCommentData = await this.comments.create({
      comment,
      postId,
      userId,
      nickname,
    });

    return createCommentData;
  };
  // 댓글 수정
  updateCmt = async (comment, commentId, userId) => {
   
      const updateCommentData = await this.comments.update(
        { comment },
        { where: { commentId, userId } }
      );
      return updateCommentData;
    
  };

  // 댓글 삭제
  deleteCmt = async (commentId, userId) => {
   
    const deleteCommentData = await this.comments.destroy(  { where: { commentId, userId } }  );
    return deleteCommentData;
  
};

  // 댓글 찾기
  findCmtById = async (commentId) => {
    const findCmt = await this.comments.findOne( { where : {commentId} });
    
    return findCmt;
  };
}

module.exports = CommentRepository;
