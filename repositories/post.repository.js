const { posts } = require("../models");

class PostRepository {
  //게시글 목록 조회
  findAllPost = async () => {
    const post = await posts.findAll(
      {attributes : {exclude: ['content']},
      order: [['createdAt', 'DESC']],
    });
    return post;
  };


  //게시글 상세 조회
  findPostById = async (postId) => {
    const post = await posts.findByPk(postId);
    //console.log(userId)
    return post;
  };

  //게시글 작성
  createPost = async (userId, nickname, title, content, likes) => {
    const createPostData = await posts.create({
      userId,
      nickname,
      title,
      content,
      likes : 0
    });
    console.log(createPostData);

    return createPostData;
  };

  //게시글 수정

  updatePost = async (postId, title, content) => {
    const updatePostData = await posts.update(
      { title, content },
      { where: { postId } }
    );
    //console.log()
    return updatePostData;
  };

  //게시글 삭제
  deletePost = async (postId) => {
    const updatePostData = await posts.destroy({ where: { postId } });

    return updatePostData;
  };

  finduserId = async (postId) => {
    const finduserid = await posts.findAll( { where : {postId} });
    console.log(finduserid[0].dataValues.postId)
    return finduserid;
  };
}
module.exports = PostRepository;

// // repositories/posts.repository.js

// const { Posts } = require('../models');

// class PostRepository {
//   findAllPost = async () => {
//     const posts = await Posts.findAll();

//     return posts;
//   };

//   findPostById = async (postId) => {
//     const post = await Posts.findByPk(postId);

//     return post;
//   };

//   createPost = async (nickname, password, title, content) => {
//     const createPostData = await Posts.create({
//       nickname,
//       password,
//       title,
//       content,
//     });

//     return createPostData;
//   };

//   updatePost = async (postId, password, title, content) => {
//     const updatePostData = await Posts.update(
//       { title, content },
//       { where: { postId, password } }
//     );

//     return updatePostData;
//   };

//   deletePost = async (postId, password) => {
//     const updatePostData = await Posts.destroy({ where: { postId, password } });

//     return updatePostData;
//   };
// }

// module.exports = PostRepository;
