const LikesService = require('../services/likes.services');   // 서비스계층 서비스폴더에 가서 posts.service모듈을 가져와서 PostService 변수에 할당

// Post의 컨트롤러(Controller)역할을 하는 클래스
class LikesController {
  likesService = new LikesService(); // PostService 클래스를  컨트롤러 클래스의 '멤버 변수'로 할당합니다.

  getLikes = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    const {userId} = res.locals.user
    const likes = await this.likesService.getLikes(userId);  //this.postService.findAllPost()의 결과값을 posts라는 상수에 할당
    res.status(200).json({ data: likes })            // 위에서 posts라는 상수에 할당된것을 json형태로 사용자에게 리턴한다
  }

  updateLikes = async (req, res, next) => {
    const { postId } = req.params;
    const { youlikes } = req.body
    const { userId } = res.locals.user
    const updatelikes = await this.likesService.updateLikes(postId, youlikes, userId);
    res.status(200).json({ result: updatelikes });
  };

}

module.exports = LikesController;