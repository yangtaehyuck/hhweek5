const { users } = require('../models');

class UserRepository {
  constructor() {
    this.users = users;   //mock을 하기위해 안에서 멤버변수로 선언 원래는 밖에 있는 users를 사용할수있지만 mock을 하기위해 안에서 사용
  }

  loginUser = async (nickname, password) => {
    const loginuser = await this.users.findAll( { where : {nickname, password} });
 
    return loginuser;
  };

  signupUser = async (nickname, Password, salt) => {
    console.log(nickname, Password, salt)
    const signupUserData = await this.users.create( { nickname, password: Password, salt } );

    return signupUserData;
  };

  findsignupUser = async (nickname) => {

    const findUserData = await this.users.findAll( { where : {nickname} });

    return findUserData;
  };

}

module.exports = UserRepository;