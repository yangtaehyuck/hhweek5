const UserService = require("../services/user.services"); // 서비스계층 서비스폴더에 가서 posts.service모듈을 가져와서 PostService 변수에 할당
const Joi = require("joi");
const re_nickname = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{3,20}$/;
const re_password = /^[a-zA-Z0-9]{4,20}$/;
const expires = new Date();
const loginSchema = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().required(),
});

const signupSchema = Joi.object({
  nickname: Joi.string().pattern(re_nickname).required(),
  password: Joi.string().pattern(re_password).required(),
  confirm: Joi.string(),
});

// Post의 컨트롤러(Controller)역할을 하는 클래스
class UserController {
  userService = new UserService(); // PostService 클래스를  컨트롤러 클래스의 '멤버 변수'로 할당합니다.

  loginUser = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;

      await loginSchema.validateAsync(req.body);

      const token = await this.userService.loginUser(nickname, password);

      expires.setMinutes(expires.getMinutes() + 60);
      res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
        expires: expires,
      });
      res.status(200).json({ message: token });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
  signupUser = async (req, res, next) => {
    try {
      const { nickname, password, confirm } = req.body;

      await signupSchema.validateAsync(req.body);
      const signuser = await this.userService.signupUser(
        nickname,
        password,
        confirm
      );

      res.status(200).json({ message: signuser });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
}

module.exports = UserController;
