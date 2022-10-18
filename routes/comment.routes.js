const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware"); // 추가한 부분

const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();

router.get("/comments/:postId", commentController.getComments); // 댓글 조회
router.post("/comments/:postId", authMiddleware, commentController.createComment); // 댓글 생성
router.put("/comments/:commentId", authMiddleware, commentController.updateComment); // 댓글 수정
router.delete("/comments/:commentId", authMiddleware, commentController.deleteComment); // 댓글 삭제

module.exports = router;


// const express = require('express');
// const router = express.Router();


// const CommentController = require('../controllers/comment.controller');
// const commentController = new CommentController();

// router.post('/comments/:postId', commentController.loginUser);
// router.get('/comments/:postId', commentController.signupUser);
// router.put('/comments/:commentId', commentController.loginUser);
// router.delete('/comments/:commentId', commentController.loginUser);

// module.exports = router;