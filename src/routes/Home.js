import React, { useEffect, useState } from "react";
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
import {
  Button,
  CardActionArea,
  CardActions,
  SliderValueLabel,
} from "@mui/material";
import target from "./img/target.png";
import logo from "./img/logo.png";
import logo_black from "./img/logo_black.png";
import logo_green from "./img/logo_green.png";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box, width } from "@mui/system";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { orange } from "@mui/material/colors";
// import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSearch } from "react-icons/fa";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";

function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [age, setAge] = React.useState("");
  const [imgFiles, setImgFiles] = useState("");
  const [items, setItems] = useState([]);
  const [open, setOpen] = React.useState(false);

  // MUI Component Style ~ *******************************************************
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  // ~ MUI Component Style  *******************************************************

  // ~ 로그아웃 ***********************************************************************
  const onClickLogout = (event) => {
    event.preventDefault();
    removeCookie("loginAccessToken");
    removeCookie("loginRefreshToken");
    setIsLogin(false);
  };
  // 로그아웃 ~ ***********************************************************************

  // 업로드 Dialog ~ *****************************************************************
  const onLoadImgFile = (e) => {
    const Imgfiles = e.target.files;
    setImgFiles(Imgfiles);
  };

  const INITIAL_VALUES = {
    imgFile: null,
    name: "",
    age: "",
    feature: "",
  };

  const [values, setValues] = useState(INITIAL_VALUES);

  const handleTargetSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("imgfile", values.imgFile);
    formdata.append("name", values.name);
    formdata.append("age", values.age);
    formdata.append("feature", values.feature);

    await axios({
      method: "post",
      url: "http://localhost:8080/api/target/upload",
      //   url: "https://db775448-41ed-4080-94f9-f461abfe0d4a.mock.pstmn.io/test",
      data: formdata,
      headers: {
        Authorization: `Bearer ${loginAccessToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res.data.accessToken);
        window.alert("업로드 성공");
        targetListGet();
      })
      .catch((error) => {
        window.alert(error);
        console.log(error);
      });

    setValues(INITIAL_VALUES);
  };

  function sanitize(type, value) {
    switch (type) {
      case "number":
        return Number(value) || 0;

      default:
        return value;
    }
  }
  const handleTargetChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleTargetInputChange = (e) => {
    const { name, value, type } = e.target;
    handleTargetChange(name, sanitize(type, value));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // ~ 업로드 Dialog *****************************************************************

  // Target 배열 바뀔때마다 렌더링 ~  *****************************************************
  const targetListGet = async () => {
    await axios({
      method: "get",
      url: "http://localhost:8080/api/target/view?method=personAge&page=1",
      //   url: "https://db775448-41ed-4080-94f9-f461abfe0d4a.mock.pstmn.io/test",
      data: {
        method: "personAge",
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${loginAccessToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res.data);
        window.alert("타겟 조회 성공");
        setItems(res.data);
      })
      .catch((error) => {
        window.alert(error);
        console.log(error);
      });
  };

  useEffect(() => {
    targetListGet();
  }, []);
  // ~ Target 배열 바뀔때마다 렌더링 *****************************************************

  return (
    <>
      {isLogin ? (
        <div id="wrap">
          <div id="header-wrap">
            <div className="header-container">
              <img src={logo_black} className="logoImg" />
            </div>
          </div>

          <div id="banner-wrap">
            <div className="banner-container">
              <button
                id="upload"
                onClick={handleClickOpen}
                className="w-btn-outline w-btn-blue-outline"
                type="button"
              >
                타겟 추가
              </button>

              <Dialog
                open={open}
                onClose={handleClose}
                onSubmit={handleTargetSubmit}
              >
                <DialogTitle className="uploadDialogTitle">
                  타겟 정보 업로드
                </DialogTitle>
                <DialogContent dividers>
                  <DialogContentText>
                    <p className="uploadDialogContent">
                      찾으려하는 타겟의 이름, 나이, 특징을 간단히 적어주세요!
                    </p>
                    <Typography gutterBottom></Typography>
                    <p>특징 예시) 갸름한 얼굴 , 쳐진 눈매</p>
                  </DialogContentText>
                  <Typography gutterBottom></Typography>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="이름"
                    type="email"
                    fullWidth
                    variant="standard"
                    name="name"
                    value={values.name}
                    onChange={handleTargetInputChange}
                  />
                  <TextField
                    margin="dense"
                    id="name"
                    label="나이"
                    type="email"
                    fullWidth
                    variant="standard"
                    name="age"
                    value={values.age}
                    onChange={handleTargetInputChange}
                  />
                  <TextField
                    margin="dense"
                    id="name"
                    label="특징"
                    type="email"
                    fullWidth
                    variant="standard"
                    name="feature"
                    value={values.feature}
                    onChange={handleTargetInputChange}
                  />
                  {/* <Button
                    type="file"
                    sx={{ mt: 5, mb: 2, minWidth: 120 }}
                    variant="contained"
                  >
                    사진 업로드
                  </Button> */}
                  <input
                    type="file"
                    id="imgFile"
                    accept="img/*"
                    // onChange={onLoadImgFile}
                    name="imgFile"
                    value={values.imgFile}
                    onChange={handleTargetChange}
                  />
                  <label htmlFor="imgFile"></label>
                </DialogContent>
                <DialogActions>
                  <Button type="submit" onClick={handleClose}>
                    저장
                  </Button>
                  <Button onClick={handleClose}>취소</Button>
                </DialogActions>
              </Dialog>

              <select className="selectInput">
                <option selected disabled>
                  Category
                </option>
                <option>나이순</option>
                <option>이름순</option>
              </select>
              <div className="select-button">
                <div className="small-arrow-down"></div>
              </div>

              <input
                placeholder="Search..."
                className="targetSearch"
                type="search"
              />
              <a className="searchIcon">
                <FaSearch className="fa" color="white" />
              </a>

              <button
                id="logout"
                onClick={onClickLogout}
                className="w-btn-outline w-btn-blue-outline"
                type="button"
              >
                로그 아웃
              </button>
            </div>
          </div>

          <div id="content-wrap">
            <div className="content-container">
              <div>
                <Box sx={{ width: "100%", mb: 5 }}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    <Item
                      sx={{
                        width: 295,
                        bgcolor: "#86a8e7",
                        boxShadow: 10,
                      }}
                    >
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
                              김정호
                            </Typography>
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              25
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              통통한 체형, 둥근 얼굴
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ bgcolor: "rgb(236, 240, 241)" }}>
                          <Button size="small" color="primary">
                            타겟 찾기
                          </Button>
                          <Button
                            size="small"
                            sx={{
                              color: "rgb(26, 188, 156)",
                              pl: 19.8,
                            }}
                          >
                            삭제
                          </Button>
                        </CardActions>
                      </Card>
                    </Item>
                    <Item
                      sx={{
                        width: 295,
                        bgcolor: "#86a8e7",
                        boxShadow: 10,
                      }}
                    >
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
                              김정호
                            </Typography>
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              25
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              통통한 체형, 둥근 얼굴
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ bgcolor: "rgb(236, 240, 241)" }}>
                          <Button size="small" color="primary">
                            타겟 찾기
                          </Button>
                          <Button
                            size="small"
                            sx={{
                              color: "rgb(26, 188, 156)",
                              pl: 19.8,
                            }}
                          >
                            삭제
                          </Button>
                        </CardActions>
                      </Card>
                    </Item>
                    <Item
                      sx={{
                        width: 295,
                        bgcolor: "#86a8e7",
                        boxShadow: 10,
                      }}
                    >
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
                              김정호
                            </Typography>
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              25
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              통통한 체형, 둥근 얼굴
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ bgcolor: "rgb(236, 240, 241)" }}>
                          <Button size="small" color="primary">
                            타겟 찾기
                          </Button>
                          <Button
                            size="small"
                            sx={{
                              color: "rgb(26, 188, 156)",
                              pl: 19.8,
                            }}
                          >
                            삭제
                          </Button>
                        </CardActions>
                      </Card>
                    </Item>
                  </Stack>
                </Box>
                <Box sx={{ width: "100%", mb: 5 }}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    <Item
                      sx={{
                        width: 295,
                        bgcolor: "#86a8e7",
                        boxShadow: 10,
                      }}
                    >
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
                              김정호
                            </Typography>
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              25
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              통통한 체형, 둥근 얼굴
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ bgcolor: "rgb(236, 240, 241)" }}>
                          <Button size="small" color="primary">
                            타겟 찾기
                          </Button>
                          <Button
                            size="small"
                            sx={{
                              color: "rgb(26, 188, 156)",
                              pl: 19.8,
                            }}
                          >
                            삭제
                          </Button>
                        </CardActions>
                      </Card>
                    </Item>
                    <Item
                      sx={{
                        width: 295,
                        bgcolor: "#86a8e7",
                        boxShadow: 10,
                      }}
                    >
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
                              김정호
                            </Typography>
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              25
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              통통한 체형, 둥근 얼굴
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ bgcolor: "rgb(236, 240, 241)" }}>
                          <Button size="small" color="primary">
                            타겟 찾기
                          </Button>
                          <Button
                            size="small"
                            sx={{
                              color: "rgb(26, 188, 156)",
                              pl: 19.8,
                            }}
                          >
                            삭제
                          </Button>
                        </CardActions>
                      </Card>
                    </Item>
                    <Item
                      sx={{
                        width: 295,
                        bgcolor: "#86a8e7",
                        boxShadow: 10,
                      }}
                    >
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
                              김정호
                            </Typography>
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              25
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              통통한 체형, 둥근 얼굴
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ bgcolor: "rgb(236, 240, 241)" }}>
                          <Button size="small" color="primary">
                            타겟 찾기
                          </Button>
                          <Button
                            size="small"
                            sx={{
                              color: "rgb(26, 188, 156)",
                              pl: 19.8,
                            }}
                          >
                            삭제
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

//////////////////////////////////////////////////////////////////////////
// const handleChange = (event) => {
//   setAge(event.target.value);
// };

{
  /* <FormControl
                fullWidth
                className="select"
                sx={{
                  width: 150,
                  m: 1,
                  border: 2,
                  bgcolor: "rgb(26, 188, 156)",
                  height: 50,
                }}
              >
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: "white" }}
                >
                  정렬
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                  sx={{ color: "white" }}
                >
                  <MenuItem value={10} sx={{ color: "rgb(26, 188, 156)" }}>
                    이름순
                  </MenuItem>
                  <MenuItem value={20} sx={{ color: "rgb(26, 188, 156)" }}>
                    나이순
                  </MenuItem>
                  <MenuItem value={30} sx={{ color: "rgb(26, 188, 156)" }}>
                    Thirty
                  </MenuItem>
                </Select>
              </FormControl> */
}
