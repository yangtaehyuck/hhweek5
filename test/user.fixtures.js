/** NaverUsers Repository Fixtures **/
exports.getNaverUserByPkInsertSchema = { userId: 1 };

// NaverUsersRepository.findNaverUser Method를 사용하기 위한 Schema
exports.findNaverUserInsertSchema = {
  id: 'Archepro84',
  nickname: 'spartaNickName',
};

exports.findUserDataresult = {
  createdAt: '2022-10-16T09:34:00.396Z',
  updatedAt: '2022-10-16T09:34:00.397Z',
  userId: 1,
  nickname: 'yang',
  password: '123d',
  salt: 'zjjPxGS61MGBBOQ9mnXPWGOE0TeSP2RZ8ZaGEAAAfI8=',
}

exports.findloginuserResultSchema = {
  createdAt: '2022-10-16T09:34:00.396Z',
  updatedAt: '2022-10-16T09:34:00.397Z',
  userId: 1,
  nickname: 'yang',
  password: '123d',
  salt: 'zjjPxGS61MGBBOQ9mnXPWGOE0TeSP2RZ8ZaGEAAAfI8=',
};