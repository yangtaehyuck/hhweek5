const PostService = require("../services/post.services");

class PostsController {
  postService = new PostService();

  //게시글 목록 조회
  getPosts = async (req, res, next) => {
    const posts = await this.postService.findAllPost();

    res.status(200).json({ data: posts });
  };

  //게시글 상세 조회
  getPostById = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.findPostById(postId);

    res.status(200).json({ data: post });
  };

  //게시글 작성
  createPost = async (req, res, next) => {
    const { title, content } = req.body;
    const { userId, nickname, likes } = res.locals.user;
    const createPostData = await this.postService.createPost(
      userId,
      nickname,
      title,
      content,
      likes
    );

    res.status(201).json({ data: createPostData });
  };

  //게시글 수정
  updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    const { userId } = res.locals.user

    const updatePost = await this.postService.updatePost(
      postId,
      title,
      content,
      userId
    );

    res
      .status(200)
      .json({ data: updatePost });
  };

  //게시글 삭제
  deletePost = async (req, res, next) => {
    const { postId } = req.params;

    const deletePost = await this.postService.deletePost(postId);

    res
      .status(200)
      .json({ data: deletePost, message: "게시글을 삭제하였습니다." });
  };
}

module.exports = PostsController;

// controllers/posts.controller.js

// const PostService = require('../services/posts.service');

// class PostsController {
//   postService = new PostService();

//   getPosts = async (req, res, next) => {
//     const posts = await this.postService.findAllPost();

//     res.status(200).json({ data: posts });
//   };

//   getPostById = async (req, res, next) => {
//     const { postId } = req.params;
//     const post = await this.postService.findPostById(postId);

//     res.status(200).json({ data: post });
//   };

//   createPost = async (req, res, next) => {
//     const { nickname, password, title, content } = req.body;
//     const createPostData = await this.postService.createPost(
//       nickname,
//       password,
//       title,
//       content
//     );

//     res.status(201).json({ data: createPostData });
//   };

//   updatePost = async (req, res, next) => {
//     const { postId } = req.params;
//     const { password, title, content } = req.body;

//     const updatePost = await this.postService.updatePost(
//       postId,
//       password,
//       title,
//       content
//     );

//     res.status(200).json({ data: updatePost });
//   };

//   deletePost = async (req, res, next) => {
//     const { postId } = req.params;
//     const { password } = req.body;

//     const deletePost = await this.postService.deletePost(postId, password);

//     res.status(200).json({ data: deletePost });
//   };
// }

// module.exports = PostsController;
