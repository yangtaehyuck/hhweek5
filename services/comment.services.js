const CommentRepository = require("../repositories/comment.repository");

class CommentService {
  commentRepository = new CommentRepository();
  // 댓글 조회
  findAllComment = async (postId) => {
    // 저장소(Repository)에게 데이터를 "요청"
    const allComment = await this.commentRepository.findAllComment(postId);

    allComment.sort((a, b) => {
      return b.createdAt - a.createdAt;
    }); // 호출 (성공)한 comment들을 가장 최신 댓글부터 정렬.
      return allComment.map((comment) => {
      // 사용자에게 "보여줄" 데이터 가공 (내가 원하는대로 가공)
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
    // 저장소(Repository)에게 데이터를 "요청".
    const createCommentData = await this.commentRepository.createCmt(
      comment,
      postId,
      userId,
      nickname
    );

    return {
      // 사용자에게 보여줄 데이터 가공
      postId: createCommentData.postId,
      nickname: createCommentData.nickname,
      comment: createCommentData.comment,
      createdAt: createCommentData.createdAt,
      updatedAt: createCommentData.updatedAt,
    };
  };

  //댓글 수정
  updateCmt = async (comment, commentId, userId) => {
    const updateCommentData = await this.commentRepository.updateCmt(
      comment,
      commentId,
      userId
    );

    if (updateCommentData === "mismatch") {
      return "수정 권한이 없습니다.";
    } else {
      return "댓글을 수정하였습니다.";
    } // return 뒤에 데이터를 가공할 수도 있겠다!! 그러면 controller부분도 수정해야 함.
  };
  a;
  // 댓글 삭제
  deleteCmt = async (commentId, userId) => {
    const deleteCommentData = await this.commentRepository.deleteCmt(
      commentId,
      userId
    );

    if (deleteCommentData === "mismatch") {
      return "삭제 권한이 없습니다.";
    } else {
      return "댓글을 삭제하였습니다.";
    }
  };
}

module.exports = CommentService;
