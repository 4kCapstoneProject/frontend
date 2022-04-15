import React, { useState } from "react";
import { connect } from "react-redux"; // connect함수 쓰기위해 import
import { userAdd } from "../redux/user";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCookie, removeCookie, setCookie } from "../shared/cookie";
import Cookies from "universal-cookie";
import Login from "./Login";

function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const onClick = (event) => {
    event.preventDefault();
    removeCookie("loginCookie");
    setIsLogin(false);
  };
  const cookieTest = (event) => {
    event.preventDefault();
    console.log(getCookie("loginCookie"));
  };
  return (
    <>
      {isLogin ? (
        <div>
          <button onClick={onClick}>로그 아웃</button>
          <button onClick={cookieTest}>쿠키 확인</button>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Home;
