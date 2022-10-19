const UserRepository = require('../repositories/user.repository');
const jwt = require("jsonwebtoken");
const crypto = require('crypto')
require('dotenv').config();
const regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{3,20}$/;


class UserService {
  userRepository = new UserRepository();

  loginUser = async (nickname, password) => {
    
    const findUserData = await this.userRepository.findsignupUser(nickname);
    const salt = findUserData[0].dataValues.salt
    const Password = findUserData[0].dataValues.password
    const PassWord = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('base64')
    if (nickname !== findUserData[0].dataValues.nickname || Password !== PassWord) {
      return "닉네임 또는 패스워드가 틀렸습니다."
    } else {

        const token = jwt.sign({  userId:findUserData[0].dataValues.userId }, 'process.env.SECRET_KEY', {
          expiresIn: '1000000s',
        });
        return token
    }
  };

  signupUser = async (nickname, password, confirm) => {
    
    const findUserData = await this.userRepository.findsignupUser(nickname, password);
    
    if (!regExp.test(nickname)) {
      return "닉네임은 최소 3자 이상이고 특수문자를 포함하지 않아야 합니다."
    }
    if (password.length < 4 || password.includes(nickname)){
      return  "비밀번호는 최소 4자 이상이며, 닉네임과 같은 값이 포함되면 안됩니다."
    }
    if (password !== confirm) {
      return "패스워드가 패스워드 확인란과 다릅니다."
    }   
    else if ( findUserData[0] !== undefined ) {
      return "닉네임이 이미 사용중입니다."
    } else {
      const salt = crypto.randomBytes(32).toString('base64')
      const Password = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('base64')
      await this.userRepository.signupUser( nickname, Password, salt);

      return "회원 가입에 성공하였습니다."
    }
  };

}

module.exports = UserService;