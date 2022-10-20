const { users } = require('../models');

class UserRepository {
  loginUser = async (nickname, password) => {
    const loginuser = await users.findAll( { where : {nickname, password} });
 
    return loginuser;
  };

  signupUser = async (nickname, Password, salt) => {
    console.log(nickname, Password, salt)
    const signupUserData = await users.create( { nickname, password: Password, salt } );

    return signupUserData;
  };

  findsignupUser = async (nickname) => {

    const findUserData = await users.findAll( { where : {nickname} });

    return findUserData;
  };

}

module.exports = UserRepository;