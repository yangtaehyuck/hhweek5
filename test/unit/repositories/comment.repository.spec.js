const CommentRepository = require("../../../repositories/comment.repository");
const {
  getNaverUserByPkInsertSchema,
  findNaverUserInsertSchema,
  createNaverUserInsertSchemaByRepository,
} = require("../../fixtures/comment.repository.fixtures");
const { Op } = require("sequelize");

const mockcommentsModel = () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findByPk: jest.fn(),
});

describe("comment Repository Layer Test", () => {
  let commentRepository = new CommentRepository();
  commentRepository.comments = mockcommentsModel(); // 아무튼 여기까지 하면 모킹이 된 거임.

  beforeEach(() => {     // 모든 Mock을 초기화합니다.
    jest.resetAllMocks();
  });

  test("findAllComment Method toHaveBeenCalled", async () => {
    const insert = { postId: 1 };
    const result = {
      commentId: 2,
      postId: 1,
      userId: 1234,
      nickname: "스파르타11",
      comment: "스파르타",
      createdAt: '2022-10-16T09:34:00.396Z',
      updatedAt: '2022-10-16T09:34:00.397Z',
    }

    commentRepository.comments.findAll = jest.fn(() => {
      return result;
    })

    const allComment = await commentRepository.findAllComment(insert);
    //1. 가공없이 반환  
      expect(allComment).toEqual(result);

    //2. 넣은 값이 잘 나옴?
      expect(commentRepository.comments.findAll)
          .toHaveBeenCalledWith( {
            where: { postId:insert.postId },
            attributes: { exclude: ["postId"] }, order: [['createdAt', 'DESC']]
          }   )

    // findAll 메소드는 몇번 호출되었는지
    expect(commentRepository.comments.findAll).toHaveBeenCalledTimes(1);

  });
    
  beforeEach(() => {
    jest.resetAllMocks();
  });
    
  test("createCmt test", async () => {
    const insert = { comment:"a", postId:1, userId:1234, nickname:"스파르" };
    const result = {
      comment: "asdf",
      postId: 1,
      userId: 1234,
      nickname: "스파르타11",   
    }

    commentRepository.comments.create = jest.fn(() => {
      return result;
    })

    const createCommentData = await commentRepository.createCmt(insert);
    //1. 가공없이 반환  
      expect(createCommentData).toEqual(result);

    //2. 넣은 값이 잘 나옴?
      expect(commentRepository.comments.create)
          .toHaveBeenCalledWith( {
            comment:insert.comment,
            postId:insert.postId,
            userId:insert.userId,
            nickname:insert.nickname,
          } )

    // findAll 메소드는 몇번 호출되었는지
    expect(commentRepository.comments.create).toHaveBeenCalledTimes(1);

  });
    
    
});
