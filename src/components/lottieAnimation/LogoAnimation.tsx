import { useRef, useEffect } from "react";
import Lottie from "lottie-web";
import animationData from "../../assets/Animation - 1705777251875.json";
import { AnimationItem } from "lottie-web";

const LogoAnimation = () => {
  const animBox = useRef<HTMLDivElement | null>(null);
  const animationInstance = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (animBox.current) {
      animationInstance.current = Lottie.loadAnimation({
        container: animBox.current,
        animationData: animationData,
        renderer: "svg",
        loop: true,
        autoplay: true,
      });
    }

    // Cleanup function
    return () => {
      animationInstance.current?.destroy();
    };
  }, []);

  return <div style={{ width: "50px" }} ref={animBox} />;
};

export default LogoAnimation;

// import React, { useRef, useEffect } from "react";
// import Lottie from "lottie-web";
// import animationData from "../../assets/Animation - 1705777251875.json";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";

// const LogoAnimation = () => {
//   const animBox = useRef(null);
//   const theme = useTheme();
//   const isLg = useMediaQuery(theme.breakpoints.down("lg"));
//   const isMd = useMediaQuery(theme.breakpoints.down("md"));
//   const isSm = useMediaQuery(theme.breakpoints.down("sm"));

//   useEffect(() => {
//     if (animBox.current) {
//       Lottie.loadAnimation({
//         container: animBox.current,
//         renderer: "svg",
//         loop: true,
//         autoplay: true,
//         animationData: animationData,
//       });
//     }

//     // Cleanup function
//     return () => {
//       if (animBox.current) {
//         Lottie.destroy();
//       }
//     };
//   }, []);

//   // Dynamically adjust the size of the Lottie container
//   const getAnimationBoxStyle = () => {
//     if (isLg) {
//       return { width: "50px", height: "50px" };
//     } else if (isMd) {
//       return { width: "10px", height: "10px" };
//     } else if (isSm) {
//       return { width: "10px", height: "10px" };
//     } else {
//       return { width: "50px", height: "55px" };
//     }
//   };

//   return <div style={getAnimationBoxStyle()} ref={animBox} />;
// };

// export default LogoAnimation;
