import { Box, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  const Heading = styled(Typography)(() => ({
    fontSize: "3rem",
  }));
  const Title = styled(Typography)(() => ({
    fontSize: "1.2rem",
  }));

  const FindADoctor = styled(Typography)(() => ({
    display: "inline",
    fontSize: "1.25rem",
    backgroundColor: "#deeaff8f",
    padding: "1rem",
    borderRadius: "10px",
    lineHeight: 2.5,
    cursor: "pointer",
  }));

  return (
    <Box
      sx={{
        display: "flex",
        height: "90vh",
        justifyContent: "space-around",
        alignItems: "center",
        border: "1px solid black",
      }}
    >
      <Box
        sx={{
          // display: "flex",
          flexDirection: "column",
          alignItems: "center",

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

      <Box>{/* Image Section */}</Box>
    </Box>
  );
}

export default HeroSection;
