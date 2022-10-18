const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

router.get('/posts/like',authMiddleware, likesController.getLikes);
router.put('/post/:postId/like',authMiddleware, likesController.updateLikes);

module.exports = router;