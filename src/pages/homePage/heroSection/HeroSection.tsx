import { Box, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import doctorImg from "../../../assets/doctor-img.jpg";

function HeroSection() {
  const navigate = useNavigate();

  const MainContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing(1),
  }));

  const Heading = styled(Typography)(({ theme }) => ({
    fontSize: "3rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "2.5rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  }));
  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "1rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.9rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.7rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.4rem",
    },
  }));

  const FindADoctor = styled(Typography)(({ theme }) => ({
    display: "inline",
    fontSize: "1.15rem",
    backgroundColor: "#deeaff8f",
    padding: "0.9rem",
    borderRadius: "10px",
    lineHeight: 2.5,
    cursor: "pointer",

    [theme.breakpoints.down("lg")]: {
      fontSize: "1rem",
      padding: "0.7rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.65rem",
      padding: "0.45rem",
      borderRadius: "7px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.35rem",
      padding: "0.3rem",
    },
  }));

  const Img = styled("img")(({ theme }) => ({
    height: "400px",
    width: "600px",
    borderRadius: "30px",
    boxShadow: "1px 10px 8px rgba(0, 0, 0, 0.3)",

    [theme.breakpoints.down("lg")]: {
      height: "300px",
      width: "480px",
    },
    [theme.breakpoints.down("md")]: {
      height: "200px",
      width: "300px",
      borderRadius: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "100px",
      width: "150px",
      borderRadius: "10px",
    },
  }));

  return (
    <MainContainer>
      <Box
        sx={{
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
        }}
      >
        <Heading>Welcome to HealthHarbor</Heading>
        <Title>Find and manage your healthcare appointments with ease.</Title>
        <FindADoctor onClick={() => navigate("/find-a-doctor")}>
          Find a Doctor
        </FindADoctor>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img src={doctorImg}></Img>
      </Box>
    </MainContainer>
  );
}

export default HeroSection;
