import { Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  const Heading = styled(Typography)(() => ({
    fontSize: "3rem",
  }));
  const Title = styled(Typography)(() => ({
    fontSize: "1.2rem",
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
        <Button
          variant="contained"
          onClick={() => navigate("/find-a-doctor")}
          sx={{ width: "200px", marginTop: "1rem" }}
        >
          Find a Doctor
        </Button>
      </Box>

      <Box>{/* Image Section */}</Box>
    </Box>
  );
}

export default HeroSection;
