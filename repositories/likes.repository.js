const { likes } = require('../models');
const { posts } = require('../models');

class LikesRepository {
  getLikes = async (userId) => {
    const findgetLikes = await likes.findAll({where: {userId}, order: [['likes', 'DESC']]})

    return findgetLikes;
  };

  uselikes = async (postId, userId) => {
    const finduselikes = await likes.findOne({where: {postId, userId}})

    return finduselikes;
  };

  updateLikes = async (postId, youlikes, userId) => {
    const likespost = await posts.findOne({where: {postId, userId}})
    let cnt = likespost.dataValues.likes
    let title = likespost.dataValues.title
    let nickname = likespost.dataValues.nickname

    cnt += 1 // 전체 좋아요
    await posts.update({likes:cnt}, {where: {postId, userId}})
    await likes.create({postId, userId, likes: cnt, nickname, title}) //좋아요 누름과 동시에 likes테이블 생성   
  };

  deletelikes = async (postId, youlikes, userId) => {
    const likespost = await posts.findOne({where: {postId, userId}})
    let cnt = likespost.dataValues.likes
    cnt -= 1
    await posts.update({likes:cnt}, {where: {postId, userId}})
    await likes.destroy({where: {postId, userId}})
  }
}

module.exports = LikesRepository;