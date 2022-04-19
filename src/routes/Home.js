import React, { useState } from "react";
import { connect } from "react-redux"; // connect함수 쓰기위해 import
import { userAdd } from "../redux/user";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCookie, removeCookie, setCookie } from "../shared/cookie";
import Cookies from "universal-cookie";
import Login from "./Login";
import "./Home.css";

function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const onClick = (event) => {
    event.preventDefault();
    removeCookie("loginAccessToken");
    removeCookie("loginRefreshToken");
    setIsLogin(false);
  };
  //   const cookieTest = (event) => {
  //     event.preventDefault();
  //     console.log(getCookie("loginAccessToken"));
  //     console.log(getCookie("loginRefreshToken"));
  //   };
  return (
    <>
      {isLogin ? (
        // <div className="home">
        //   {/* <button onClick={cookieTest}>쿠키 확인</button> */}
        //   <div className="nav">

        //   </div>
        //   <hr></hr>
        //   <div className="container"></div>
        // </div>
        <div id="wrap">
          <div id="header-wrap">
            <div className="header-container">
              <span className="logo">4KIM</span>
              <button
                id="logout"
                onClick={onClick}
                className="w-btn-outline w-btn-blue-outline"
                type="button"
              >
                로그 아웃
              </button>
            </div>
          </div>
          <div id="banner-wrap">
            <div className="banner-container">banner</div>
          </div>
          <div id="content-wrap">
            <div className="content-container">content</div>
          </div>
          <div id="footer-wrap">
            <div className="footer-container">footer</div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Home;
