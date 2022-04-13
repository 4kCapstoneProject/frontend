import React, { useState } from "react";
import axios from "axios";
import { userAdd } from "../redux/user";
import { connect } from "react-redux"; // connect함수 쓰기위해 import
import "./LoginRegister.css";
import { Link } from "react-router-dom";

function Register({ userAdd }) {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onNameHandler = (event) => {
    setUserId(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setUserEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setUserPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onClick = (event) => {
    // event.preventDefault();
    console.log("hi");
    if (userPassword !== confirmPassword) {
      return alert("비밀번호와 비밀번호확인은 같아야 합니다.");
    }
    axios({
      method: "post",
      //   url: "http://localhost:8080/api/auth/register",
      url: "https://db775448-41ed-4080-94f9-f461abfe0d4a.mock.pstmn.io/test",
      data: {
        userId: userId,
        userPw: userPassword,
        auth: "ROLE_ADMIN",
        email: userEmail,
      },
    })
      .then((res) => {
        window.alert(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="loginregister">
      <form>
        <h2>회원 가입</h2>
        <div className="input-box">
          <input
            userId="userId"
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={onNameHandler}
          />
          <label for="create_username">아이디</label>
        </div>
        <div className="input-box">
          <input
            userId="userEmail"
            type="userEmail"
            placeholder="이메일"
            value={userEmail}
            onChange={onEmailHandler}
          />
          <label for="create_useremail">이메일</label>
        </div>
        <div className="input-box">
          <input
            userId="userPassword"
            type="userPassword"
            placeholder="비밀번호"
            value={userPassword}
            onChange={onPasswordHandler}
          />
          <label for="create_userpassword">비밀번호</label>
        </div>

        <div className="input-box">
          <input
            userId="confirmPassword"
            type="userPassword"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
          />
          <label for="check_password">비밀번호 확인</label>
        </div>
        <div className="input-box">
          {/* 버튼? or input? */}
          <button onClick={onClick}>계정 생성하기</button>
        </div>
      </form>
    </div>
  );
}

// mapDispatchToProps는 action을 prop으로 컴포넌트에 담아줌 / 반드시 object를 return 해야함
function mapDispatchToProps(dispatch) {
  return {
    userAdd: (id, password, auth, email) =>
      dispatch(userAdd(id, password, auth, email)),
  };
}

export default connect(null, mapDispatchToProps)(Register);
