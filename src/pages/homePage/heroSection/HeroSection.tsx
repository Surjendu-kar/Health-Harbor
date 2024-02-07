import { Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  const Heading = styled(Typography)(() => ({
    fontSize: "3rem",
  }));
  const Title = styled(Typography)(() => ({
    fontSize: "1.5rem",
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
      <Box>
        <Heading>Welcome to HealthHarbor</Heading>
        <Title>Find and manage your healthcare appointments with ease.</Title>
        <Button onClick={() => navigate("/find-a-doctor")}>
          Find a Doctor
        </Button>
      </Box>
      <Box>img</Box>
    </Box>
  );
}

export default HeroSection;
