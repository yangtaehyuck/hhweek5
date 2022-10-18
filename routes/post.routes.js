const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const PostController = require('../controllers/post.controller');
const postController = new PostController();

router.post('/posts', authMiddleware, postController.createPost);
router.get('/posts',authMiddleware, postController.getPosts);
router.get('/posts/:postId',authMiddleware, postController.getPostById);
router.put('/posts/:postId',authMiddleware, postController.updatePost);
router.delete('/posts/:postId',authMiddleware, postController.deletePost);

module.exports = router;