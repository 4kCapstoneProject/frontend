import React, { useState } from "react";
import "./LoginRegister.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호확인은 같아야 합니다.");
    }
  };

  return (
    <div className="loginregister">
      <form>
        <h2>회원 가입</h2>
        <div className="input-box">
          <input
            name="name"
            type="text"
            placeholder="이름"
            value={name}
            onChange={onNameHandler}
          />
          <label for="create_username">이름</label>
        </div>
        <div className="input-box">
          <input
            name="email"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={onEmailHandler}
          />
          <label for="create_useremail">이메일</label>
        </div>
        <div className="input-box">
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onPasswordHandler}
          />
          <label for="create_userpassword">비밀번호</label>
        </div>

        <div className="input-box">
          <input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
          />
          <label for="check_password">비밀번호 확인</label>
        </div>
        <div className="input-box">
          {/* 버튼? or input? */}
          <button type="submit" onSubmit={onSubmit}>
            계정 생성하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default Register;
