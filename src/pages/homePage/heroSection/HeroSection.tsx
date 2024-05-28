import { Box, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeroAnimation from "../../../components/lottieAnimation/HeroAnimation";

function HeroSection() {
  const navigate = useNavigate();

  const MainContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing(1),
    overflow: "hidden",
  }));
  const AnimatedBox = styled(Box)(({ theme }) => ({
    paddingLeft: "1rem",
    "@keyframes scrollAnimation": {
      "0%": {
        transform: "translateX(-50%)",
        opacity: 0,
      },
      "100%": {
        transform: "translateX(0)",
        opacity: 1,
      },
    },
    animation: "scrollAnimation 1s ease-out forwards",
  }));

  const Heading = styled(Typography)(({ theme }) => ({
    fontSize: "3.25rem",
    fontWeight: "bold",
    color: "#15285ce8",
    letterSpacing: "0.85px",

    [theme.breakpoints.down("lg")]: {
      fontSize: "2.5rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
      letterSpacing: "0.7px",
      marginBottom: "0.25rem",
    },
  }));
  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "1.35rem",
    fontWeight: "bold",
    color: "#030d28ba",
    paddingLeft: "5px",
    marginBottom: "1.5rem",
    letterSpacing: "1px",

    [theme.breakpoints.down("lg")]: {
      fontSize: "0.9rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.65rem",
      paddingLeft: "1px",
      letterSpacing: "0.75px",
    },
  }));

  const FindADoctor = styled(Typography)(({ theme }) => ({
    display: "inline",
    fontSize: "1.25rem",
    backgroundColor: "#deeaff8f",
    padding: "0.8rem",
    borderRadius: "7px",
    // border: "1px solid black",
    boxShadow: "1px 5px 5px rgba(0, 0, 0, 0.2)",
    lineHeight: 2.5,
    cursor: "pointer",
    transition: "font-size 0.2s ease",
    letterSpacing: "0.9px",


    "&:hover": {
      fontSize: "1.3rem",
      boxShadow: "1px 7px 4px rgba(0, 0, 0, 0.2)",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "1rem",
      padding: "0.7rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
      padding: "0.4rem",
      borderRadius: "5px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.55rem",
      padding: "0.4rem",
      borderRadius: "3px",
      letterSpacing: "0.7px",
    },
  }));

  const ImageContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "40%",
      paddingRight: "1rem",
    },
  }));

  return (
    <MainContainer>
      <AnimatedBox>
        <Heading>Welcome to HealthHarbor</Heading>
        <Title>Find and manage your healthcare appointments with ease.</Title>
        <FindADoctor onClick={() => navigate("/find-a-doctor")}>
          Find a Doctor
        </FindADoctor>
      </AnimatedBox>

      <ImageContainer>
        <HeroAnimation />
      </ImageContainer>
    </MainContainer>
  );
}

export default HeroSection;


