const PostRepository = require("../repositories/post.repository");

class PostService {
  postRepository = new PostRepository();

  //게시글 목록
  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost() 

    return allPost.map((post) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  //게시글 상세 조회
  findPostById = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);
    //console.log(userId)
    return {
      postId: findPost.postId,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
  };

  //게시글 작성
  createPost = async (userId, nickname, title, content, likes) => {
    const createPostData = await this.postRepository.createPost(
      userId,
      nickname,
      title,
      content,
      likes
    );

    return  "message : 게시글 작성에 성공하였습니다."
  };

  //게시글 수정

  updatePost = async (postId, title, content, userId) => {
    //console.log(userId, postId, title, content)

    
    const FinduserId = await this.postRepository.finduserId(postId)

    if (userId === FinduserId[0].dataValues.userId) {
    await this.postRepository.updatePost(postId, title, content);
    const updatePost = await this.postRepository.findPostById(postId);
    //console.log(updatePost.postId)
      return "게시글을 수정하였습니다."
    }else {
      return "게시글 작성자의 userId와 다릅니다."
    }
};

  //게시글 삭제

  deletePost = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);
    // if (!findPost) throw new Error("권한이 없습니다 휴먼");
    await this.postRepository.deletePost(postId);

    return {
      postId: findPost.postId,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
  };
}

module.exports = PostService;

// // services/posts.services.js

// const PostRepository = require('../repositories/posts.repository');

// class PostService {
//   postRepository = new PostRepository();

//   findAllPost = async () => {
//     const allPost = await this.postRepository.findAllPost();

//     allPost.sort((a, b) => {
//       return b.createdAt - a.createdAt;
//     });

//     return allPost.map((post) => {
//       return {
//         postId: post.postId,
//         nickname: post.nickname,
//         title: post.title,
//         createdAt: post.createdAt,
//         updatedAt: post.updatedAt,
//       };
//     });
//   };

//   findPostById = async (postId) => {
//     const findPost = await this.postRepository.findPostById(postId);

//     return {
//       postId: findPost.postId,
//       nickname: findPost.nickname,
//       title: findPost.title,
//       content: findPost.content,
//       createdAt: findPost.createdAt,
//       updatedAt: findPost.updatedAt,
//     };
//   };

//   createPost = async (nickname, password, title, content) => {
//     const createPostData = await this.postRepository.createPost(
//       nickname,
//       password,
//       title,
//       content
//     );

//     return {
//       postId: createPostData.null,
//       nickname: createPostData.nickname,
//       title: createPostData.title,
//       content: createPostData.content,
//       createdAt: createPostData.createdAt,
//       updatedAt: createPostData.updatedAt,
//     };
//   };

//   updatePost = async (postId, password, title, content) => {
//     const findPost = await this.postRepository.findPostById(postId);
//     if (!findPost) throw new Error("Post doesn't exist");

//     await this.postRepository.updatePost(postId, password, title, content);

//     const updatePost = await this.postRepository.findPostById(postId);

//     return {
//       postId: updatePost.postId,
//       nickname: updatePost.nickname,
//       title: updatePost.title,
//       content: updatePost.content,
//       createdAt: updatePost.createdAt,
//       updatedAt: updatePost.updatedAt,
//     };
//   };

//   deletePost = async (postId, password) => {
//     const findPost = await this.postRepository.findPostById(postId);
//     if (!findPost) throw new Error("Post doesn't exist");

//     await this.postRepository.deletePost(postId, password);

//     return {
//       postId: findPost.postId,
//       nickname: findPost.nickname,
//       title: findPost.title,
//       content: findPost.content,
//       createdAt: findPost.createdAt,
//       updatedAt: findPost.updatedAt,
//     };
//   };
// }

// module.exports = PostService;
