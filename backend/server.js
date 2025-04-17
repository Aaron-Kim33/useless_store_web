const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// 미들웨어 설정
app.use(cors()); // React와 통신 허용
app.use(express.json()); // JSON 데이터 파싱

// MongoDB 연결
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB 연결 성공!"))
  .catch((err) => console.error("MongoDB 연결 실패:", err));

// 기본 라우트 (테스트용)
app.get("/", (req, res) => {
  res.send("백엔드 서버 동작 중!");
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
