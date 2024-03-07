import { Box, Typography, styled } from "@mui/material";

const MainContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  borderRadius: "10px",
  padding: "2.5rem 3.5rem",
  backgroundColor: "#fff",
  minWidth: "6rem",
  margin: "1rem",
  boxShadow: "1px 5px 8px rgba(0, 0, 0, 0.2)",

  [theme.breakpoints.down("lg")]: {
    padding: "2rem 3rem",
    minWidth: "5rem",
    margin: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    padding: "1rem 2rem",
    minWidth: "4rem",
    margin: "0.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem 1.5rem",
    minWidth: "2.5rem",
    margin: "0rem",
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
    height: "25px",
    width: "25px",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.5rem",
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
