import { useRef, useEffect } from "react";
import Lottie from "lottie-web";
import animationData from "../../assets/heroAnimation/Animation - 1714235849397.json";

import { AnimationItem } from "lottie-web";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import styled from "styled-components";

const MainContainer = styled(Box)(({ theme }) => ({
  width: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const BestMedicalTreatmentAnimation = () => {
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
        width: isSm ? "200px" : isMd ? "300px" : isLg ? "380px" : "410px",
      }}
    />
  );
};

export default BestMedicalTreatmentAnimation;
