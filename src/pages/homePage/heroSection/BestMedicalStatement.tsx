import { Box, Typography, styled } from "@mui/material";
const MainContainer = styled(Box)(({ theme }) => ({
  width: "35%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "6rem",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: { width: "45%" },
  [theme.breakpoints.down("sm")]: { marginTop: "0rem", width: "70%" },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#15285ce8",
  letterSpacing: "0.85px",

  [theme.breakpoints.down("lg")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
    textAlign: "center",
    letterSpacing: "0.5px",
    margin: "1rem 0 0",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  color: "#030d28ba",
  margin: "1rem 0 0rem",
  letterSpacing: "1px",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.9rem",
    margin: "1rem 0",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
    margin: "0.75rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.65rem",
    paddingLeft: "1px",
    margin: "0.5rem 0",
    letterSpacing: "0.5px",
  },
}));

function BestMedicalStatement() {
  return (
    <MainContainer>
      <Heading>We always Ensure best Medical treatment for your Health</Heading>
      <Title>
        HealthHarbor always help to provide proper treatment for most of get the
        proper cure and healty life which is the cooperate focus thing for us
        patient our main proprity services.
      </Title>
    </MainContainer>
  );
}

export default BestMedicalStatement;
