const UserService = require('../services/user.services');   // 서비스계층 서비스폴더에 가서 posts.service모듈을 가져와서 PostService 변수에 할당

// Post의 컨트롤러(Controller)역할을 하는 클래스
class UserController {
  userService = new UserService(); // PostService 클래스를  컨트롤러 클래스의 '멤버 변수'로 할당합니다.

  loginUser = async (req, res, next) => {
    const { nickname, password } = req.body;

    const loginuser = await this.userService.loginUser(nickname, password)

    res.status(200).json({"message":loginuser});
  } 
  signupUser = async (req, res, next) => {
    const { nickname, password, confirm } = req.body;

    const signuser = await this.userService.signupUser(nickname, password, confirm);

    res.status(200).json({"message":signuser});
}

}

module.exports = UserController;