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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import target from "./img/target.png";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [age, setAge] = React.useState("");

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
              <button
                id="upload"
                // onClick={onClick}
                className="w-btn-outline w-btn-blue-outline"
                type="button"
              >
                타겟 추가
              </button>
              <FormControl
                className="combobox"
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>이름순</MenuItem>
                  <MenuItem value={20}>나이순</MenuItem>
                  {/* <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
              <input type="search" placeholder="HI" />

              {/* <form className="searchForm">
                <fieldset className="searchFieldset">
                  <input className="searchInput" type="search" />
                  <button className="searchButton" type="submit">
                    
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </button>
                </fieldset>
              </form> */}
            </div>
          </div>
          <div id="content-wrap">
            <div className="content-container">
              <div>
                <Box sx={{ width: "100%" }}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    <Item sx={{ width: 330 }}>
                      <Card sx={{ maxWidth: 345 }} className="targetImg">
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="250"
                            image={target}
                            alt="타겟"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              이름
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              특징
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary">
                            타겟 찾기
                          </Button>
                        </CardActions>
                      </Card>
                    </Item>
                    <Item sx={{ width: 330 }}>
                      <Card sx={{ maxWidth: 345 }} className="targetImg">
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="250"
                            image={target}
                            alt="타겟"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              이름
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              특징
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary">
                            타겟 찾기
                          </Button>
                        </CardActions>
                      </Card>
                    </Item>
                    <Item sx={{ width: 330 }}>
                      <Card sx={{ maxWidth: 345 }} className="targetImg">
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="250"
                            image={target}
                            alt="타겟"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              이름
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              특징
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary">
                            타겟 찾기
                          </Button>
                        </CardActions>
                      </Card>
                    </Item>
                  </Stack>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    <Item sx={{ width: 330 }}>
                      <Card sx={{ maxWidth: 345 }} className="targetImg">
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="250"
                            image={target}
                            alt="타겟"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              이름
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              특징
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary">
                            타겟 찾기
                          </Button>
                        </CardActions>
                      </Card>
                    </Item>
                    <Item sx={{ width: 330 }}>
                      <Card sx={{ maxWidth: 345 }} className="targetImg">
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="250"
                            image={target}
                            alt="타겟"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              이름
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              특징
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary">
                            타겟 찾기
                          </Button>
                        </CardActions>
                      </Card>
                    </Item>
                    <Item sx={{ width: 330 }}>
                      <Card sx={{ maxWidth: 345 }} className="targetImg">
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="250"
                            image={target}
                            alt="타겟"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              이름
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              특징
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary">
                            타겟 찾기
                          </Button>
                        </CardActions>
                      </Card>
                    </Item>
                  </Stack>
                </Box>
              </div>
            </div>
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
