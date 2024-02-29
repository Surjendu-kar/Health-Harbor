import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ViewDetails from "../../components/viewDetails/ViewDetails";
import { Box, Rating, Typography, styled } from "@mui/material";

const MainContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

const Container = styled(Box)(({ theme }) => ({
  width: "50%",
}));

const ImgContainer = styled(Box)(({ theme }) => ({
  margin: "2rem 0",
  display: "flex",
  alignItems: "center",

  [theme.breakpoints.down("lg")]: {
    margin: "1.5rem 0",
  },
  [theme.breakpoints.down("md")]: {
    margin: "1rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0.8rem 0",
  },
}));

const Img = styled("img")(({ theme }) => ({
  height: "160px",
  width: "160px",
  borderRadius: "10px",

  [theme.breakpoints.down("lg")]: {
    height: "120px",
    width: "120px",
  },
  [theme.breakpoints.down("md")]: {
    height: "100px",
    width: "100px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "40px",
    width: "40px",
  },
}));

const NameRatingBox = styled(Box)(({ theme }) => ({
  marginLeft: "1rem",
  [theme.breakpoints.down("lg")]: {
    marginLeft: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: "0.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0.3rem",
  },
}));

const Specialization = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  padding: "0.5rem 0.8rem",
  maxWidth: "50%",
  borderRadius: "5px",
  backgroundColor: "#d1e2ff",
  textAlign: "center",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.6rem",
    padding: "0.4rem 0.6rem",
    maxWidth: "40%",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.5rem",
    padding: "0.3rem 0.5rem",
    maxWidth: "40%",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.4rem",
    padding: "0rem 0.2rem",
    maxWidth: "50%",
    borderRadius: "3px",
  },
}));

const Name = styled(Typography)(({ theme }) => ({
  fontSize: "1.05rem",
  fontWeight: "bold",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.5rem",
  },
}));

const ResponsiveRating = styled(Rating)(({ theme }) => ({
  fontSize: "0.9rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.4rem",
  },
}));

const DetailContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: "2.5rem 0 2rem 0",

  [theme.breakpoints.down("lg")]: {
    margin: "2rem 0 1.7rem 0",
  },
  [theme.breakpoints.down("md")]: {
    margin: "1.5rem 0 1.35rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "1rem 0",
  },
}));

const StyleText = styled(Typography)(({ theme, selected }) => ({
  fontSize: "14px",
  position: "relative",
  fontWeight: "bold",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    height: "1px",
    width: "100%",
    transition: "all ease 0.3s",
    backgroundColor: selected ? "#000" : "#dadadab5", // Change based on selected prop
  },

  "&:hover::after": {
    backgroundColor: "#000",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "10px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "7px",
  },
}));

function DoctorDetails() {
  const { state } = useLocation();
  const [showDetails, setShowDetails] = useState(true);
  const [value, setValue] = React.useState<number | null>(2);

  useEffect(() => {
    console.log(state.doctor);
  }, [state]);

  const handleAboutClick = () => {
    setShowDetails(true);
  };

  const handleFeedbackClick = () => {
    setShowDetails(false);
  };

  return (
    <MainContainer>
      <Container>
        <ImgContainer>
          <Img src={state.doctor.img} />

          <NameRatingBox>
            <Specialization>{state.doctor.specialization}</Specialization>
            <Name>{state.doctor.name}</Name>
            <ResponsiveRating name="read-only" value={value} readOnly />
          </NameRatingBox>
        </ImgContainer>

        <DetailContainer sx={{ gap: 2 }}>
          <StyleText onClick={handleAboutClick} selected={showDetails}>
            About
          </StyleText>
          <StyleText onClick={handleFeedbackClick} selected={!showDetails}>
            Feedback
          </StyleText>
        </DetailContainer>
        {showDetails ? (
          <ViewDetails fetchedData={state.doctor} />
        ) : (
          <Box>feedback</Box>
        )}
      </Container>
    </MainContainer>
  );
}

export default DoctorDetails;
