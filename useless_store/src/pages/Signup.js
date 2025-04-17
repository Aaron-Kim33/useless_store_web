import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      console.log("회원가입 성공:", response.data);
      // 성공 시 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="이름"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="email"
        name="email"
        placeholder="이메일"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">가입하기</button>
    </form>
  );
};

export default Signup;
