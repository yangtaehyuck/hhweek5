const UserRepository = require('../repositories/user.repository');
const jwt = require("jsonwebtoken");

class UserService {
  userRepository = new UserRepository();

  loginUser = async (nickname, password) => {
    const loginuser = await this.userRepository.loginUser(nickname, password);
    console.log(loginuser[0].dataValues.userId)
    if (nickname !== loginuser[0].dataValues.nickname || password !== loginuser[0].dataValues.password) {
      return "닉네임 또는 패스워드가 틀렸습니다."
    } else {
      return {
        token: jwt.sign({ userId:loginuser[0].dataValues.userId }, "my-secret-key")   
    }
  };
}

  signupUser = async (nickname, password, confirm) => {
    const findUserData = await this.userRepository.findsignupUser(nickname, password);
    let regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{3,20}$/;
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
      const signupUserData = await this.userRepository.signupUser(nickname, password);
  
      return "회원 가입에 성공하였습니다."
    }
  };

}

module.exports = UserService;