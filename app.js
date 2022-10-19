const express = require("express");
const authMiddleware = require("./middlewares/auth-middleware");
const app = express();
const userRouter = require("./routes/user.routes");
const likesRouter = require("./routes/likes.routes");
const postRouter = require("./routes/post.routes");
const commentRouter = require("./routes/comment.routes");
const router = express.Router();
// require('dotenv').config();
const cookieParser = require('cookie-parser');

const swaggerFile = require('./swagger-output');
const swaggerUi = require('swagger-ui-express');

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerFile, { explorer: true }));

app.use(express.json());
app.use("/", [userRouter, likesRouter, router, postRouter, commentRouter, cookieParser()]);

app.get("/users/me", authMiddleware, async (req, res) => { //  /users/me로 들어오는 경로는 authMiddleware가 붙는다
    const { user } = res.locals; //locals안에 user의 값이 변수 user에 객체구조분해할당이된다
    res.send({
      user: {
        nickname: user.nickname,
      }
    });
});

app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});