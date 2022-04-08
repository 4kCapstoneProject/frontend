import React, { useState } from "react";
import "./LoginRegister.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="loginregister">
      <form>
        <h2>로그인</h2>
        <div className="input-box">
          <input
            name="email"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={onEmailHandler}
          />
          <label for="username">아이디</label>
        </div>
        <div className="input-box">
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onPasswordHandler}
          />
          <label for="password">비밀번호</label>
        </div>

        <div>
          {/* 버튼? or input? */}
          <button type="submit" onSubmit={onSubmit}>
            로그인
          </button>
        </div>
        <div id="not_register">
          아직 회원이 아니신가요? <button id="create_id">회원 가입</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
