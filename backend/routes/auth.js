const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 회원가입
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 중복 체크
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
    }

    // 새 사용자 생성
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "회원가입 성공!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
});

module.exports = router;
