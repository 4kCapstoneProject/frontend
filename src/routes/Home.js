import React, { useState } from "react";
import { connect } from "react-redux"; // connect함수 쓰기위해 import
import { userAdd } from "../redux/user";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCookie, removeCookie, setCookie } from "../shared/cookie";
import Cookies from "universal-cookie";
import Login from "./Login";
import "./Home.css";
// import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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
            <div className="banner-container">
              <form className="searchForm">
                <fieldset className="searchFieldset">
                  <input className="searchInput" type="search" />
                  <button className="searchButton" type="submit">
                    <i className="fa fa-search"></i>
                    {/* <i class="fa-solid fa-magnifying-glass"></i> */}
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
          <div id="content-wrap">
            <div className="content-container">content</div>
          </div>
          <div id="footer-wrap">
            <div className="footer-container">
              <Pagination className="pagination" count={10} color="primary" />
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Home;
