import React, { useState } from "react";
import { connect } from "react-redux"; // connect함수 쓰기위해 import
import { userAdd } from "../redux/user";
import { emailCheck } from "../shared/common";
import axios from "axios";
import "./LoginRegister.css";
import { Link } from "react-router-dom";
import { getCookie, setCookie } from "../shared/cookie";
import Cookies from "universal-cookie";
import Home from "./Home";

function Login({ userAdd }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const onEmailHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onClick = (event) => {
    event.preventDefault();
    if (id === "" || password === "") {
      window.alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    // if (!emailCheck(id)) {
    //   window.alert("이메일 형식이 맞지 않습니다.");
    // }

    axios({
      method: "post",
      url: "http://localhost:8080/api/auth/login",
      //   url: "https://db775448-41ed-4080-94f9-f461abfe0d4a.mock.pstmn.io/test",
      data: {
        userId: id,
        userPw: password,
      },
    })
      .then((res) => {
        console.log(res.data.accessToken);
        userAdd(
          res.data.userId,
          res.data.userPw,
          res.data.auth,
          res.data.email
        );

        window.alert("로그인 성공!!");
        //쿠키에 토큰 저장
        //   setCookie("is_login", ${accessToken});
        //   document.location.href = "/";
        setCookie("loginAccessToken", res.data.accessToken, {
          path: "/",
          //   expires: Math.floor(Date.now() / 1000) + 60 * 60,
        });
        setCookie("loginRefreshToken", res.data.refreshToken, {
          path: "/",
        });
        console.log(getCookie("loginAccessToken"));
        console.log(getCookie("loginRefreshToken"));
        setIsLogin(true);
      })
      .catch((error) => {
        window.alert(error);
        console.log(error);
      });

    setId("");
    setPassword("");
  };

  return (
    <>
      {isLogin ? (
        <Home />
      ) : (
        <div className="loginregister">
          <form>
            <h2>로그인</h2>
            <div className="input-box">
              <input
                name="id"
                type="text"
                placeholder="이메일"
                value={id}
                onChange={onEmailHandler}
              />
              <label htmlFor="username">아이디</label>
            </div>
            <div className="input-box">
              <input
                name="password"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={onPasswordHandler}
              />
              <label htmlFor="password">비밀번호</label>
            </div>

            <div>
              {/* 버튼? or input? */}
              {/* <button type="submit" onSubmit={onSubmit}> */}
              <button className="create_login" onClick={onClick}>
                로그인
              </button>
            </div>
            <div id="not_register">
              아직 회원이 아니신가요?{" "}
              <Link to="/register">
                <button id="create_id">회원 가입</button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

// mapDispatchToProps는 action을 prop으로 컴포넌트에 담아줌 / 반드시 object를 return 해야함
function mapDispatchToProps(dispatch) {
  return {
    userAdd: (id, password) => dispatch(userAdd(id, password)),
  };
}

export default connect(null, mapDispatchToProps)(Login);

// export default Login;
