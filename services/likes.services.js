const LikesRepository = require('../repositories/likes.repository');

class LikesService {
  likesRepository = new LikesRepository();

  getLikes = async (userId) => {
    const findgetLikes = await this.likesRepository.getLikes(userId);
    const findgetlikes = findgetLikes.map((x)=> {
      return {
              postId: x.postId,
              userId: x.userId,
              nickname: x.nickname,
              title: x.title,
              createdAt: x.createdAt,
              updatedAt: x.updatedAt,
              likes: x.likes
            }
    })
    return findgetlikes
  };

  updateLikes = async (postId, youlikes, userId) => {
    const uselikes = await this.likesRepository.uselikes(postId, userId);

    if (youlikes===true && uselikes === null) {
        const updatelikes = await this.likesRepository.updateLikes(postId, youlikes, userId);
        return "message : 게시글의 좋아요를 등록하였습니다."
    }else if (youlikes===false && uselikes !== null) {
        const deletelikes = await this.likesRepository.deletelikes(postId, youlikes, userId);
        return "message : 게시글의 좋아요를 취소하였습니다."
    }else if (youlikes === true && uselikes !== null) {
        return "message : 이미 게시글에 좋아요을 누르셨습니다."
    }else {
        return "message : 이미 싫어요를 누르셨습니다."
    }
  }
}
module.exports = LikesService;