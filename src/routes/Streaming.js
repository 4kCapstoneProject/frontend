import React, { useRef, useEffect, useState } from "react";
import "./Streaming.css";
import logo_black from "./img/logo_black.png";
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
import wh from "./img/wh.jpg";
import wh_model from "./img/wh_model.jpg";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import SwipeableViews from "react-swipe";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import html2canvas from "html2canvas";
import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../shared/cookie";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { userAdd } from "../redux/user";
import { connect } from "react-redux"; // connect함수 쓰기위해 import
import { Link } from "react-router-dom";
import altTarget from "./img/altTarget.png";
import CircularProgress from "@mui/material/CircularProgress";
import { red } from "@mui/material/colors";

const images = [
  {
    label: "Capture 1",
    imgPath: wh_model,
    // "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

const INITIAL_IMGS = [
  // {
  //   // imgPath: wh_model,
  //   imgPath:
  //     "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  // },
  {
    imagePathDto: [
      {
        fileName: "altTarget4.png",
        filePath:
          "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
        targetpk: 0,
      },
    ],
    scoreList: "",
  },
];

const testImg = [
  {
    imgPath: wh_model,
  },
  {
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

function Streaming({ users, addPk }) {
  console.log(users);
  const [imageFiles, setImageFiles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [targetPk, setTargetPk] = useState(0);
  const [modelTargetInfo, setModelTargetInfo] = useState(INITIAL_IMGS);
  const [getPk, setGetPk] = useState(users[0].pk);
  const [baseTargetText, setBaseTargetText] = useState(users[0].user[0]);
  const [baseTargetPk, setBaseTargetPk] = useState(baseTargetText.targetPk);
  const [baseTargetImg, setBaseTargetImg] = useState(users[0].user[1]);
  const [isLoading, setIsLoading] = useState(false);
  const [colorBorder, setColorBorder] = useState("none");
  const [imgName, setImgName] = useState("사진 업로드");

  console.log(baseTargetPk);

  function CircularIndeterminate() {
    return (
      // <Box sx={{ display: "flex" }}>
      <CircularProgress />
      // </Box>
    );
  }
  // ~ 로그아웃 ***********************************************************************
  const onClickLogout = (event) => {
    // event.preventDefault();
    removeCookie("loginAccessToken");
    removeCookie("loginRefreshToken");
  };
  // 로그아웃 ~ ***********************************************************************
  const captureTransform = async (e) => {
    // e.preventDefault();
    // console.log("시작");
    await axios({
      method: "get",
      url:
        "http://211.201.72.35:4000/api/return/transmitToModel?targetId=" +
        baseTargetPk,
      headers: {
        Authorization: `Bearer ${getCookie("loginAccessToken")}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        console.log("모델로 이미지 전송");
        captureTransformGet();
      })
      .catch((error) => {
        window.alert(error);
        console.log(error);
      });
    // setModelTargetInfo(testImg);
  };

  const captureTransformGet = async (e) => {
    // e.preventDefault();

    console.log("시작");
    await axios({
      method: "get",
      url:
        "http://211.201.72.35:4000/api/return/modelInfoList?targetId=" +
        baseTargetPk,
      headers: {
        Authorization: `Bearer ${getCookie("loginAccessToken")}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setModelTargetInfo(res.data);
      })
      .catch((error) => {
        window.alert(error);
        console.log(error);
      });
  };
  // 영상 옆 타겟 이미지 style
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // swipeable views ~ *******************************************************************

  // const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const AutoPlaySwipeableViews = SwipeableViews;

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  // const maxSteps = images.length;
  const maxSteps = modelTargetInfo.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  // ~ swipeable views  *******************************************************************

  // 스트리밍 ~~~~~~  ***********************************************************************
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasphoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };

  const takeCapture = () => {
    html2canvas(document.querySelector(".camera")).then((canvas) => {
      let myImage = canvas.toDataURL();
      downloadURI(myImage, "captureImg.jpg");
    });
  };

  const downloadURI = (uri, name) => {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    getVideo();
    if (modelTargetInfo && modelTargetInfo.length > 0) {
      console.log(modelTargetInfo);
    }
  }, [videoRef, modelTargetInfo]);
  // ~ 스트리밍  *******************************************************************

  // 업로드 Dialog ~ *****************************************************************
  const onLoadImgFile = (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;
    const imageFile = e.target.files[0];
    // setImageFiles([...imageFiles, { uploadedFile: imageFile }]);
    setImageFiles(imageFile);
    // handleTargetChange(name, sanitize(type, value));
    setImgName(imageFile.name);
    console.log(imageFiles);
  };

  const INITIAL_VALUES = {
    targetPk: targetPk,
  };

  const [values, setValues] = useState(INITIAL_VALUES);

  const handleTargetSubmit = async (e) => {
    // e.preventDefault();

    setIsLoading(true);

    const imageFileList = new FormData();
    // imageFileList.append("imageFileList", imageFiles[0].uploadedFile);
    imageFileList.append("captureImage", imageFiles);
    imageFileList.append("targetId", baseTargetPk);
    imageFileList.append("isUploadFile", 0);

    for (let key of imageFileList.keys()) {
      console.log(key);
    }
    for (let value of imageFileList.values()) {
      console.log(value);
    }

    await axios({
      method: "post",
      url: "http://211.201.72.35:4000/api/target/uploadCaptureImage",

      data: imageFileList,
      headers: {
        Authorization: `Bearer ${getCookie("loginAccessToken")}`,
      },
    })
      .then((res) => {
        console.log(" 서버로 이미지 전송 성공");

        // setTimeout(captureTransform, 5000);
        captureTransform();
      })
      .catch((error) => {
        window.alert(error);
        console.log(error);
      });
    setOpen(false);
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
    setTargetPk(value);
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

  return (
    <div id="streaming_wrap">
      <div id="streaming_header">
        <div id="streaming_header_container">
          <img src={logo_black} className="streaming_logo" />
          <Link to="/Home">
            <button
              id="confirmInfo"
              className="confirmInfoBtn streamingBtn"
              type="button"
            >
              타겟 정보 확인
            </button>
          </Link>

          <Link to="/Login">
            <button
              id="streaming_logout"
              onClick={onClickLogout}
              className="logoutBtn streamingBtn"
              type="button"
            >
              로그 아웃
            </button>
          </Link>
        </div>
      </div>
      <div id="streaming_body_wrap">
        <div id="streaming_contents2">
          <div className="camera">
            <video ref={videoRef}></video>
          </div>
          <div className="actionBtnDiv">
            {/* <form onSumbit={handleTargetSubmit} entype="multipart/formdata"> */}
            {/* <button onClick={handleClickOpen} className="actionBtn">
              업로드{" "}
            </button> */}
            <button
              onClick={takeCapture}
              // className="actionBtn"
              className="w-btn-neon2"
            >
              타겟 캡처
            </button>

            <label
              htmlFor="imgFile"
              //  className="imgInput"
              // className="actionBtn"
              className="w-btn-neon2"
            >
              사진 업로드
            </label>
            <input
              type="file"
              id="imgFile"
              accept="img/*"
              name="imgFile"
              onChange={onLoadImgFile}
              style={{ display: "none" }}
            />
            <button
              onClick={handleTargetSubmit}
              // className="actionBtn"
              className="w-btn-neon2"
            >
              타겟 복원
            </button>
            {/* </form> */}

            {/* <button onClick={captureTransform} className="actionBtn">
              복원 사진 가져오기
            </button>
            <button onClick={captureTransformGet} className="actionBtn">
              로로로
            </button> */}

            {/* <Dialog
              open={open}
              onClose={handleClose}
              onSubmit={handleTargetSubmit}
            >
              <form onSumbit={handleTargetSubmit} entype="multipart/formdata">
                <DialogTitle className="uploadDialogTitle">
                  타겟 사진 복원
                </DialogTitle>
                <DialogContent dividers>
                  <DialogContentText>
                    <Typography className="uploadDialogContent">
                      마스크를 쓰고 있는 타겟의 사진과 타겟 넘버를 적어주세요.
                    </Typography>
                    <Typography gutterBottom></Typography>
                  </DialogContentText>
                  <Typography gutterBottom></Typography>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="targetPk"
                    label="No."
                    type="email"
                    fullWidth
                    variant="standard"
                    name="targetPk"
                    value={values.targetPk || ""}
                    onChange={handleTargetInputChange}
                  />
                  <Typography gutterBottom></Typography>
                  <label htmlFor="imgFile" className="imgInput">
                    사진 업로드
                  </label>
                  <input
                    type="file"
                    id="imgFile"
                    accept="img/*"
                    name="imgFile"
                    onChange={onLoadImgFile}
                    style={{ display: "none" }}
                  />
                </DialogContent>

                <DialogActions>
                  <Button type="submit" onClick={handleTargetSubmit}>
                    저장
                  </Button>
                  <Button onClick={handleClose}>취소</Button>
                </DialogActions>
              </form>
            </Dialog> */}
          </div>
        </div>

        <hr className="streaming_hr"></hr>
        <div id="streaming_side">
          <Item
            sx={{
              // width: 400,
              bgcolor: "none",
              boxShadow: 10,
              // bgcolor: "#6aafe6",
              bgcolor: "#EBE8EA",
            }}
          >
            <Card sx={{ width: 450, boxShadow: 10 }} className="targetImg">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="455"
                  //  image={wh}
                  image={"../imgs/" + baseTargetImg.fileName}
                  alt="타겟"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {baseTargetText.personName} ({baseTargetText.personAge}세)
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    // sx={{ mb: 1 }}
                  >
                    {baseTargetText.characteristic}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    
                  </Typography> */}
                </CardContent>
              </CardActionArea>
            </Card>
          </Item>
        </div>
        {isLoading ? (
          <div id="loading_streaming_contents">
            <CircularIndeterminate />
          </div>
        ) : (
          <div id="streaming_contents">
            <Box
              className="capture"
              sx={{
                maxWidth: 800,
                flexGrow: 1,
                boxShadow: 10,
                // height: 450,
                // border: 3,
                // borderColor: colorBorder,
              }}
            >
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {modelTargetInfo.map((step, index) => (
                  <div key={step.label}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Box
                        component="img"
                        sx={{
                          height: 480,
                          display: "block",
                          maxWidth: 800,
                          overflow: "hidden",
                          width: "100%",
                        }}
                        src={"../imgs/" + step.imagePathDto[0].fileName}
                        alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-PLoRMWL5UoMYj-AsLi880s6SfHMHtEhdYA&usqp=CAU"
                      />
                    ) : null}

                    <Paper
                      square
                      elevation={0}
                      align="center"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 50,
                        pl: 2,
                        bgcolor: "#6aafe6",
                        color: "white",
                        // bgcolor: "#EBE8EA",
                        alignContent: "center",
                        align: "center",
                      }}
                    >
                      <Typography align="center">
                        유사도 : {step.scoreList} (%)
                      </Typography>
                    </Paper>
                  </div>
                ))}
              </AutoPlaySwipeableViews>
              <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    Next
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                    Back
                  </Button>
                }
              />
            </Box>
          </div>
        )}
        {/* <div id="streaming_footer">footer</div> */}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { users: state };
}

function mapDispatchToProps(dispatch) {
  return {
    addPk: (pk) => dispatch(userAdd(pk)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Streaming);

// export default Streaming;
