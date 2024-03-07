import { Box, Typography, styled } from "@mui/material";

const MainContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  borderRadius: "15px",
  padding: "3.5rem 4rem",
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
    padding: "2rem 2.5rem",
    minWidth: "4rem",
    margin: "0.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "1.5rem 2rem",
    minWidth: "3.5rem",
    margin: "0rem",
    borderRadius: "10px",
  },
}));

const Img = styled("img")(({ theme }) => ({
  height: "80px",
  width: "80px",
  borderRadius: "50px",
  backgroundColor: "#f3f8ffb1",
  [theme.breakpoints.down("lg")]: {
    height: "60px",
    width: "60px",
  },
  [theme.breakpoints.down("md")]: {
    height: "50px",
    width: "50px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "40px",
    width: "40px",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
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
