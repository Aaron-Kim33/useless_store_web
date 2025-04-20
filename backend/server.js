const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// 1. 라우터 import
const authRouter = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ 옵션이 있는 CORS 미들웨어만 남긴다!
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. MongoDB 연결
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB 연결 성공!"))
  .catch((err) => console.error("MongoDB 연결 실패:", err));

// 4. 라우터 등록
app.use("/api/auth", authRouter);

// 5. 기본 라우트 (테스트용)
app.get("/", (req, res) => {
  res.send("백엔드 서버 동작 중!");
});

// 6. 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
