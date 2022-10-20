// const { DESCRIBE } = require('sequelize/types/query-types');
const UserRepository = require('./user.repository');
const {findUserDataresult, findloginuserResultSchema} = require('../test/user.fixtures');

const mockUsersModel = () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn(),
});

describe('user repository test', () => {
  let userRepository = new UserRepository();
  userRepository.users = mockUsersModel();  //  user.repository의 this.users를 가리킴 mocking함

  beforeEach( () => {   // 테스트코드를 실행하기전에 모든 모킹들을 초기화함 jest안에 있는 mock 속성들을
    jest.resetAllMocks();

  });

  test('findsignupUser test', async () => {
    const findsignupUserSchema = {
      nickname: 'yang'
    }

    userRepository.users.findAll = jest.fn(() => {
      return findUserDataresult;
    })

    const findUserData =  await userRepository.findsignupUser(findsignupUserSchema);

    // findAll을 1번 실행했나?
    expect(userRepository.users.findAll).toHaveBeenCalledTimes(1);
    // findUserData와 userRepository.UserRepository.findAll가 같은 값인가?
    expect(findUserData).toEqual(findUserDataresult);
  });

  test('loginUser test', async () => {
    const loginUserSchema = {
      nickname: 'yang',
      password: '123d'
    }

    userRepository.users.findAll = jest.fn(() => {
      return findloginuserResultSchema
    })
    const loginuser = await userRepository.loginUser(loginUserSchema);

    expect(userRepository.users.findAll).toHaveBeenCalledTimes(1)

    expect(loginuser).toEqual(findloginuserResultSchema);
    console.log(findloginuserResultSchema)
    expect(findloginuserResultSchema).toHaveBeenCalledWith({ where : {nickname: loginUserSchema.nickname, password: loginUserSchema.password} });   
  })

})