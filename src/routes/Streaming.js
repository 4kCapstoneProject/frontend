import React from "react";
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

function Streaming() {
  // 영상 옆 타겟 이미지 style
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // swipeable views ~ *******************************************************************
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

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
  return (
    <div id="streaming_wrap">
      <div id="streaming_header">
        <div id="streaming_header_container">
          <img src={logo_black} className="streaming_logo" />
          <button
            id="confirmInfo"
            className="confirmInfoBtn streamingBtn"
            type="button"
          >
            타겟 정보 확인
          </button>
          <button
            id="streaming_logout"
            // // onClick={onClickLogout}
            className="logoutBtn streamingBtn"
            type="button"
          >
            로그 아웃
          </button>
        </div>
      </div>
      <div id="streaming_body_wrap">
        <div id="streaming_contents2">video</div>

        <hr className="streaming_hr"></hr>
        <div id="streaming_side">
          <Item
            sx={{
              // width: 400,
              bgcolor: "none",
              boxShadow: 10,
              bgcolor: "#6aafe6",
            }}
          >
            <Card sx={{ width: 450, boxShadow: 10 }} className="targetImg">
              <CardActionArea>
                <CardMedia component="img" height="450" image={wh} alt="타겟" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    김우혁 (26)
                  </Typography>
                  {/* <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    25
                  </Typography> */}
                  <Typography variant="body2" color="text.secondary">
                    다리털 없음
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Item>
        </div>
        <div id="streaming_contents">
          <Box
            className="capture"
            sx={{
              maxWidth: 800,
              flexGrow: 1,
              boxShadow: 10,
              // height: 450,
            }}
          >
            <Paper
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
                pl: 2,
                // bgcolor: "background.default",
                bgcolor: "#6aafe6",
                color: "white",
              }}
            >
              <Typography>{images[activeStep].label}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        // height: 255,
                        height: 480,
                        display: "block",
                        maxWidth: 800,
                        overflow: "hidden",
                        width: "100%",
                      }}
                      src={step.imgPath}
                      alt={step.label}
                    />
                  ) : null}
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

        {/* <div id="streaming_footer">footer</div> */}
      </div>
    </div>
  );
}

export default Streaming;
