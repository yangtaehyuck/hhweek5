const express = require("express");
const jwt = require("jsonwebtoken");
const {users} = require("./models");
const {posts} = require("./models");
const {comments} = require("./models");
const authMiddleware = require("./middlewares/auth-middleware");
const app = express();
const router = express.Router();
const { Op } = require("sequelize");
const {likes} = require("./models");

app.use("/",[express.json(),router]);
router.post("/signup", async (req, res) => {
  const { nickname, password, confirm } = req.body;

  const nickname1 = nickname.split('')
  console.log(nickname1)
  let regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{3,9}$/;
  if (!regExp.test(nickname)) {
    res.status(400).send({result:"message : 닉네임은 최소 3자 이상이고 특수문자를 포함하지 않아야 합니다."})
    return;
  }
  if (password.length < 4 || password.includes(nickname)){
    res.status(400).send({result:"message : 비밀번호는 최소 4자 이상이며, 닉네임과 같은 값이 포함되면 안됩니다."})
    return;
  }

  if (password !== confirm) {

    res.status(400).send({
      errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
    });
    return;
  }
  // nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
  const existsUsers = await users.findAll({
    where: {
      nickname
    }
  });
  
  if (existsUsers.length !== 0) {
    res.status(400).send({
      errorMessage: "닉네임이 이미 사용중입니다.",
    });
    return;
  }
  await users.create({ nickname: nickname, password: password });
  res.status(201).send({"message":"회원 가입에 성공하였습니다."});
});
// 기존 post api
// router.post("/users", async (req, res) => {
//   const { nickname, email, password, confirmPassword } = req.body;

//   if (password !== confirmPassword) {
//     res.status(400).send({
//       errMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.',
//     });
//     return;
//   }

//   const existUsers = await User.find({
//     $or: [{ email },{ nickname }],
//   });
//   if (existUsers.length) {
//     res.status(400).send({
//       errMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.',
//     });
//     return;
//   }

//   const user = new User({ email, nickname, password});
//   await user.save();

//   res.status(201).send({});
// });
router.post("/login", async (req, res) => {
  const { nickname, password } = req.body;
  const User = await users.findOne({ where: { nickname, password } })
  // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
  if (!User || password !== User.dataValues.password) {
    res.status(400).send({
      errorMessage: "닉네임 또는 패스워드가 틀렸습니다.",
    });
    return;
  }
  console.log(User.dataValues.userId)
  res.send({
    token: jwt.sign({ userId:User.dataValues.userId }, "my-secret-key"),
  });
});

// 기존 로그인 api
// router.post("/auth", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email, password }).exec();

//   if (!user) {
//     res.status(401).send({
//       errMessage: "이메일 또는 패스워드가 잘못됐습니다.",
//     });
//     return;
//   }

//   const token = jwt.sign({ userId: user.userId }, "my-secret-key");
// // const token = jwt.sign({ userId: user.userId }, "customized-secret-key"); 라는 형식으로 token을 만들수있음
//   res.send({
//     token, 
//   })
// });

app.get("/users/me", authMiddleware, async (req, res) => { //  /users/me로 들어오는 경로는 authMiddleware가 붙는다
    const { user } = res.locals; //locals안에 user의 값이 변수 user에 객체구조분해할당이된다
    res.send({
      user: {
        nickname: user.nickname,
      },
    });
});

// 위와 같은 코드임
// router.get("/users/me", authMiddleware, async (req, res) => {
//   res.send({ user: res.locals.user });
//   });

//게시글 생성
router.post("/posts",authMiddleware,async (req, res) => {
  const { title, content } = req.body
  const { userId, nickname } = res.locals.user
  await posts.create({userId, nickname, title : title, content : content, likes: 0 })
  // const existsposts = await posts.findAll({
  //   where: {
  //     titles
  //   }
  // });
  // console.log(existsposts)
  // if (existsposts===title) {
  //   res.send({result:"message : 게시글이 이미 존재합니다."})
  // }else {
    
  // }
  res.send({result:"message : 게시글 작성에 성공하였습니다."})

  
})
//게시글 조회
router.get("/posts", authMiddleware,async (req, res) => {
  const postall = await posts.findAll({attributes : {exclude: ['content']}})
  // const lookpost = []
  // for (let i = 0; i< postall.length; i++) {
  //   lookpost.push({
  //     postId: postall[i].postId,
  //     userId: postall[i].userId,
  //     nickname: postall[i].nickname,
  //     title: postall[i].title,
  //     createdAt: postall[i].createdAt,
  //     updatedAt: postall[i].updatedAt,
  //     likes: postall[i].likes
  //   })
  // }
  res.json({"data":postall})
})

router.get("/posts/like", authMiddleware,async (req, res) => {
  const {userId} = res.locals.user
  const postlike = await likes.findAll({where: {userId}, order: [['likes', 'DESC']]})
  console.log(postlike)
  const looklike = postlike.map((x) => {
    return {
      postId: x.postId,
      userId: x.userId,
      nickname: x.nickname,
      title: x.title,
      createdAt: x.createdAt,
      updatedAt: x.updatedAt,
      likes: x.likes
    }
  })
  res.json({"data":looklike})
})
//게시글 상세 조회
// const existsUsers = await users.findAll({
//   where: {
//     nickname
//   }
// });

router.get("/posts/:postId",authMiddleware, async (req, res) => {
  const {postId} = req.params
  const findpost = await posts.findAll({ //params에 받은 postId값으로 posts에 있는 postId와 같은 값을 가진 데이터를 모두 가져온다
    where: {
      postId
    }
  })
  const detailposts = findpost.map((x) => {
    return {
      postId: x.postId,
      userId: x.userId,
      nickname: x.nickname,
      title: x.title,
      content: x.content,
      createdAt: x.createdAt,
      updatedAt: x.updatedAt,
      likes: x.likes
    }
  })
  res.json({"data": detailposts})
})
//게시글 수정
router.put("/posts/:postId",authMiddleware, async (req, res) => {
  const {postId} = req.params
  const {title, content} = req.body
  await posts.update({title, content}, {where: {postId}})
  
  res.send({result:"message : 게시글을 수정하였습니다."})
})
//게시글 삭제
router.delete("/posts/:postId",authMiddleware, async (req, res) => {
  const {postId} = req.params
  await posts.destroy({
    where: {postId}
  });

  res.send({result:"message : 게시글을 삭제하였습니다."})
})


//댓글 생성
router.post("/comments",authMiddleware,async (req, res) => {
  const { comment } = req.body
  const { userId, nickname } = res.locals.user
  await comments.create({userId, nickname, comment })
  // const existsposts = await posts.findAll({
  //   where: {
  //     title
  //   }
  // });
  // console.log(existsposts)
  // if (existsposts===title) {
  //   res.send({result:"message : 게시글이 이미 존재합니다."})
  // }else {
    
  // }
  res.send({result:"message : 게시글 작성에 성공하였습니다."})

  
})
//댓글 조회
router.get("/comments",async (req, res) => {
  const commentall = await comments.findAll({order: [['createdAt', 'DESC']]})
  

  res.json({"data":commentall})
})

//댓글 수정
router.put("/comments/:commentId",authMiddleware, async (req, res) => {
  const {commentId} = req.params
  const {comment} = req.body
  await comments.update({comment}, {where: {commentId}})
  
  res.send({result:"message : 게시글을 수정하였습니다."})
})
//게시글 삭제
router.delete("/comments/:commentId",authMiddleware, async (req, res) => {
  const {commentId} = req.params
  await comments.destroy({
    where: {commentId}
  });

  res.send({result:"message : 게시글을 삭제하였습니다."})
})

//좋아요 게시글 조회 자신이 좋아요를 누른 게시글 가져오기 userId
// router.get("/posts/like", authMiddleware,async (req, res) => {
//   const {userId} = res.locals.user
//   const {postlike} = await likes.findAll({where: {userId}})
//   console.log(postlike)
//   const looklike = postlike.map((x) => {
//     return {
//       postId: x.postId,
//       userId: x.userId,
//       nickname: x.nickname,
//       title: x.title,
//       createdAt: x.createdAt,
//       updatedAt: x.updatedAt,
//       likes: x.likes
//     }
//   })
//   res.json({"data":looklike})
// })

//게시글 좋아요
router.put("/post/:postId/like",authMiddleware, async (req, res) => {
  const {postId} = req.params
  const {userId} = res.locals.user
  const {youlikes} = req.body
  const likespost = await posts.findOne({where: {postId, userId}})
  const uselikes = await likes.findOne({where: {postId, userId}})
  let cnt = likespost.dataValues.likes
  let title = likespost.dataValues.title
  let nickname = likespost.dataValues.nickname
if (youlikes===true && uselikes === null ) {
        cnt += 1 // 전체 좋아요
        await posts.update({likes:cnt}, {where: {postId, userId}})
        await likes.create({postId, userId, likes: cnt, nickname, title}) //좋아요 누름과 동시에 likes테이블 생성
        res.send({result:"message : 게시글의 좋아요를 등록하였습니다."})
}else if (youlikes===false && uselikes !== null ) {
        cnt -= 1
        await posts.update({likes:cnt}, {where: {postId, userId}})
        await likes.destroy({where: {postId, userId}})
        res.send({result:"message : 게시글의 좋아요를 취소하였습니다."})
}else if (youlikes === true && uselikes !== null) {
        res.send({result:"message : 이미 게시글에 좋아요을 누르셨습니다."})
}else {
        res.send({result:"message : 이 게시글이 싫어요."})
}
})

app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});