import { Box, Typography, styled } from "@mui/material";

const MainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "15px",
  padding: "0rem 3rem",
  height: "170px",
  backgroundColor: "#fff",
  margin: "1rem",
  boxShadow: "1px 5px 8px rgba(0, 0, 0, 0.2)",

  [theme.breakpoints.down("lg")]: {
    padding: "0rem 2rem",
    margin: "0.7rem",
    height: "130px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0rem 1.5rem",
    maxWidth: "2.5rem",
    margin: "0.25rem",
    height: "90px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0rem 1.2rem",
    maxWidth: "2rem",
    margin: "0.2rem",
    borderRadius: "10px",
    height: "75px",
  },
}));

const Img = styled("img")(({ theme }) => ({
  height: "70px",
  width: "70px",
  borderRadius: "50px",
  backgroundColor: "#f3f8ffb1",
  [theme.breakpoints.down("lg")]: {
    height: "60px",
    width: "60px",
  },
  [theme.breakpoints.down("md")]: {
    height: "40px",
    width: "40px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "35px",
    width: "35px",
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
    fontSize: "0.6rem",
  },
}));

function SpecializationDesign({ img, title }) {
  return (
    <MainContainer>
      <Img src={img} />
      <Title>{title}</Title>
    </MainContainer>
  );
}

export default SpecializationDesign;
