import { useRef, useEffect } from "react";
import Lottie from "lottie-web";
import animationData from "../../assets/Animation - 1707317749384.json";
import { AnimationItem } from "lottie-web";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import styled from "styled-components";

const MainContainer = styled(Box)`
  width: 300px;
`;

const LogoAnimation = () => {
  const animBox = useRef<HTMLDivElement | null>(null);
  const animationInstance = useRef<AnimationItem | null>(null);
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

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

    return () => {
      animationInstance.current?.destroy();
    };
  }, []);

  return (
    <MainContainer
      ref={animBox}
      sx={{
        width: isSm ? "100px" : isMd ? "200px" : isLg ? "280px" : "300px",
      }}
    />
  );
};

export default LogoAnimation;
