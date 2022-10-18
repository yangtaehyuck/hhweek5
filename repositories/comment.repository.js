const { comments } = require("../models"); // DB영역에서는 꼭 필요한 존재.

class CommentRepository {
  // 댓글 조회
  findAllComment = async (postId) => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const allComment = await comments.findAll({
      where: { postId },
      attributes: { exclude: ["postId"] },
    });

    return allComment;
  };
  // 댓글 생성
  createCmt = async (comment, postId, userId, nickname) => {
    const createCommentData = await comments.create({
      comment,
      postId,
      userId,
      nickname,
    });

    return createCommentData;
  };
  // 댓글 수정
  updateCmt = async (comment, commentId, userId) => {
    const selectedComment = await comments.findOne({ where: { commentId } });
    if (userId !== selectedComment.userId) {
      const updateCommentData = "mismatch";
      return updateCommentData;
    } else {
      const updateCommentData = await comments.update(
        { comment },
        { where: { commentId, userId } } // 일치하지 않아도 undefinded가 아니다!! (존재하지않는 정보도) 그냥 수정해버리네;;
      );
      return updateCommentData;
    }
  };

  // 댓글 삭제
  deleteCmt = async (commentId, userId) => {
    const selectedComment = await comments.destroy({ where: {commentId, userId } });
  };
}

module.exports = CommentRepository;
