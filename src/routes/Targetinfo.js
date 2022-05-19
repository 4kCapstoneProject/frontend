// import React from "react";
// import logo_black from "./img/logo_black.png";
// import "./Targetinfo.css";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { CardActionArea, CardActions } from "@mui/material";
// import target from "./img/target.png";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
// import { blue } from "@mui/material/colors";
// import { borders } from "@mui/system";

// function Targetinfo() {
//   const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   }));

//   return (
//     <div id="targetInfo_wrap">
//       <div id="targetInfo_header">
//         <div id="targetInfo_header_container">
//           <img src={logo_black} className="targetInfo_logo" />
//           {/* <button
//             id="targetInfo_logout"

//             className="targetinfoLogoutBtn targetInfoBtn"
//             type="button"
//           >
//             로그인
//           </button> */}
//         </div>
//       </div>
//       <div id="targetInfo_body_wrap">
//         <div id="targetInfo_body">
//           <Item
//             sx={{
//               // width: 440,
//               bgcolor: "none",
//               boxShadow: 10,
//               borderColor: "blue",
//               border: "none",
//               bgcolor: "#86a8e7",
//             }}
//           >
//             <Card
//               sx={{ width: 400, boxShadow: 10, borderColor: "blue" }}
//               className="targetImg"
//             >
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   height="400"
//                   image={target}
//                   alt="타겟"
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     김정호
//                   </Typography>
//                   <Typography
//                     variant="h6"
//                     color="text.secondary"
//                     sx={{ mb: 1 }}
//                   >
//                     25
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     키 173정도
//                   </Typography>
//                   {/* <Typography
//                     gutterBottom
//                     variant="h5"
//                     component="div"
//                     color="blue"
//                   >
//                     유사도 : 80%
//                   </Typography> */}
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Item>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Targetinfo;

import React, { useRef, useEffect, useState } from "react";
import "./Targetinfo.css";

function Targetinfo() {
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

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);
  return (
    <div className="targetInfo">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>SNAP!</button>
      </div>
      <div className={"result " + (hasphoto ? "hasPhoto" : "")}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closePhoto}>CLOSE!</button>
      </div>
    </div>
  );
}

export default Targetinfo;
