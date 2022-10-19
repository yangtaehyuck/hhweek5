const express = require("express");
const authMiddleware = require("./middlewares/auth-middleware");
const app = express();
const userrouter = require("./routes/user.routes")
const likesrouter = require("./routes/likes.routes")
const postrouter = require("./routes/post.routes")
const commentrouter = require("./routes/comment.routes")
const router = express.Router();

app.use(express.json())
app.use("/", [userrouter, likesrouter, router, postrouter, commentrouter]);

app.get("/users/me", authMiddleware, async (req, res) => { //  /users/me로 들어오는 경로는 authMiddleware가 붙는다
    const { user } = res.locals; //locals안에 user의 값이 변수 user에 객체구조분해할당이된다
    console.log(user)
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
// router.post("/posts",authMiddleware,async (req, res) => {
//   const { title, content } = req.body
//   const { userId, nickname } = res.locals.user
//   await posts.create({userId, nickname, title : title, content : content, likes: 0 })
//   // const existsposts = await posts.findAll({
//   //   where: {
//   //     titles
//   //   }
//   // });
//   // console.log(existsposts)
//   // if (existsposts===title) {
//   //   res.send({result:"message : 게시글이 이미 존재합니다."})
//   // }else {
    
//   // }
//   res.send({result:"message : 게시글 작성에 성공하였습니다."})

  
// })
// //게시글 조회
// router.get("/posts", authMiddleware,async (req, res) => {
//   const postall = await posts.findAll({attributes : {exclude: ['content']}})
//   // const lookpost = []
//   // for (let i = 0; i< postall.length; i++) {
//   //   lookpost.push({
//   //     postId: postall[i].postId,
//   //     userId: postall[i].userId,
//   //     nickname: postall[i].nickname,
//   //     title: postall[i].title,
//   //     createdAt: postall[i].createdAt,
//   //     updatedAt: postall[i].updatedAt,
//   //     likes: postall[i].likes
//   //   })
//   // }
//   res.json({"data":postall})
// })

// // router.get("/posts/like", authMiddleware,async (req, res) => {
// //   const {userId} = res.locals.user
// //   const postlike = await likes.findAll({where: {userId}, order: [['likes', 'DESC']]})
// //   console.log(postlike)
// //   const looklike = postlike.map((x) => {
// //     return {
// //       postId: x.postId,
// //       userId: x.userId,
// //       nickname: x.nickname,
// //       title: x.title,
// //       createdAt: x.createdAt,
// //       updatedAt: x.updatedAt,
// //       likes: x.likes
// //     }
// //   })
// //   res.json({"data":looklike})
// // })
// //게시글 상세 조회
// // const existsUsers = await users.findAll({
// //   where: {
// //     nickname
// //   }
// // });

// router.get("/posts/:postId",authMiddleware, async (req, res) => {
//   const {postId} = req.params
//   const findpost = await posts.findAll({ //params에 받은 postId값으로 posts에 있는 postId와 같은 값을 가진 데이터를 모두 가져온다
//     where: {
//       postId
//     }
//   })
//   const detailposts = findpost.map((x) => {
//     return {
//       postId: x.postId,
//       userId: x.userId,
//       nickname: x.nickname,
//       title: x.title,
//       content: x.content,
//       createdAt: x.createdAt,
//       updatedAt: x.updatedAt,
//       likes: x.likes
//     }
//   })
//   res.json({"data": detailposts})
// })
// //게시글 수정
// router.put("/posts/:postId",authMiddleware, async (req, res) => {
//   const {postId} = req.params
//   const {title, content} = req.body
//   await posts.update({title, content}, {where: {postId}})
  
//   res.send({result:"message : 게시글을 수정하였습니다."})
// })
// //게시글 삭제
// router.delete("/posts/:postId",authMiddleware, async (req, res) => {
//   const {postId} = req.params
//   await posts.destroy({
//     where: {postId}
//   });

//   res.send({result:"message : 게시글을 삭제하였습니다."})
// })


//댓글 생성
// router.post("/comments/:postId",authMiddleware,async (req, res) => {
//   const {postId} = req.params
//   const { comment } = req.body
//   const { userId, nickname } = res.locals.user
//   if (comment === "") {
//     res.send({result:"message : 댓글 내용을 입력해주세요."})
//   } else {
//   await comments.create({userId, nickname, comment, postId })
//   res.send({result:"message : 댓글 작성에 성공하였습니다."})
//   }

  
// })
// //댓글 조회
// router.get("/comments/:postId",async (req, res) => {
//   const {postId} = req.params
//   const commentall = await comments.findAll({where: {postId}},{order: [['createdAt', 'DESC']]},{attributes : {exclude: ['content']}})
//   res.json({"data":commentall})
// })

// //댓글 수정
// router.put("/comments/:commentId",authMiddleware, async (req, res) => {
//   const {commentId} = req.params
//   const {comment} = req.body
//   const { userId } = res.locals.user
//   const find = await comments.findOne({where:{userId}})

//   if (userId === find){
//     await comments.update({comment}, {where: {commentId}})
//     res.send({result:"message : 댓글을 수정하였습니다."})
//   }else {
//     res.send({result:"message : 이 댓글의 작성자가 아닙니다."})
//   }
  

// })
// //게시글 삭제
// router.delete("/comments/:commentId",authMiddleware, async (req, res) => {
//   const {commentId} = req.params
//   const { userId } = res.locals.user
//   const find = await comments.findOne({where:{userId}})
//   if (userId === find){
//   await comments.destroy({
//     where: {commentId}
//   });
//     res.send({result:"message : 댓글을 삭제하였습니다."})
//   } else {
//     res.send({result:"message : 이 댓글의 작성자가 아닙니다."})
//   }
// })

//게시글 좋아요
// router.put("/post/:postId/like",authMiddleware, async (req, res) => {
//   const {postId} = req.params
//   const {userId} = res.locals.user
//   const {youlikes} = req.body
//   const likespost = await posts.findOne({where: {postId, userId}})
//   const uselikes = await likes.findOne({where: {postId, userId}})
//   let cnt = likespost.dataValues.likes
//   let title = likespost.dataValues.title
//   let nickname = likespost.dataValues.nickname
// if (youlikes===true && uselikes === null ) {
//         cnt += 1 // 전체 좋아요
//         await posts.update({likes:cnt}, {where: {postId, userId}})
//         await likes.create({postId, userId, likes: cnt, nickname, title}) //좋아요 누름과 동시에 likes테이블 생성
//         res.send({result:"message : 게시글의 좋아요를 등록하였습니다."})
// }else if (youlikes===false && uselikes !== null ) {
//         cnt -= 1
//         await posts.update({likes:cnt}, {where: {postId, userId}})
//         await likes.destroy({where: {postId, userId}})
//         res.send({result:"message : 게시글의 좋아요를 취소하였습니다."})
// }else if (youlikes === true && uselikes !== null) {
//         res.send({result:"message : 이미 게시글에 좋아요을 누르셨습니다."})
// }else {
//         res.send({result:"message : 이 게시글이 싫어요."})
// }
// })

app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});