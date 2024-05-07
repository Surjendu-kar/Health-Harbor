import React from "react";
import { Box, Typography, styled } from "@mui/material";

const SubHeading = styled(Typography)(({ theme }) => ({
  fontSize: "h2",
  fontWeight: "bold",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {
    fontSize: "35px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "28px",
    textAlign: "center",
  },
}));

const Content = styled(Typography)(({ theme }) => ({
  fontSize: "h6",
  // margin: "0 25rem",
  // textAlign: "center",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {
    fontSize: "13px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
    textAlign: "center",
    margin: "0 2rem",
  },
}));

const TopContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#e9f0ff",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "31rem",
  justifyContent: "center",
  alignItems: "center",
  color: "#494a5f",
 
  [theme.breakpoints.down("lg")]: {
    height: "25rem",
  },
  [theme.breakpoints.down("sm")]: {
    height: "21rem",
  },

  [theme.breakpoints.down("sm")]: {
    height: "19rem",
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row",
    width: "40%",
    paddingRight: "1rem",
  },
}));

const BottomContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(1),
  overflow: "hidden",
  margin: "5rem",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1rem",
    margin: "0.5rem",
  },
}));

const Header = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    fontSize: "23px",
    textAlign: "center",
  },
}));

const Aboutus = styled(Typography)(({ theme }) => ({}));

const Feature = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    margin: "20px",
  },
}));

const MainTopic = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const Topic = styled(Box)(({ theme }) => ({
  marginTop: "2rem",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
}));

const SubTopic = styled(Box)(({ theme }) => ({
  marginTop: "6px",
  marginLeft: "5px",
  fontSize: "21px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
  },
}));

const FeatureImg = styled("img")(({ theme }) => ({
  width: "35px",
  height: "40px",
  [theme.breakpoints.down("sm")]: {
    width: "28px",
    height: "30px",
  },
}));

const MainImg = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "20rem",
  },
}));

function AboutUs() {
  return (
    <Box>
      <TopContainer>
        <SubHeading variant="h3">Know About HealthHarbor</SubHeading>
        <br />
        <Content variant="h6" textAlign={"center"}>
          HealthHarbor always help to provide proper treatment <br />
          for all of get proper cure and healthy life which is the most focus
          thing
        </Content>
      </TopContainer>
      <BottomContainer>
        <ImageContainer>
          <MainImg
            src={
              "https://media.istockphoto.com/id/1370194865/vector/two-young-doctors-with-stethoscope-and-tablet-isolated-on-blue-background-young-medical.jpg?s=612x612&w=0&k=20&c=gPC-Oi19VDjmFr32f0GMNPkfrbzLf64KFyJ7CW-cxfU="
            }
            alt=""
          />
        </ImageContainer>
        <Aboutus>
          <Header variant="h4" fontWeight={"bold"}>
            We always Ensure best Medical treatment for your Health
          </Header>
          <br />
          <Content variant="h6">
            HealthHarbor always help to provide proper for most of get the
            proper cure and healthy life which is the cooperate focus thing for
            us patient our main proprity services
          </Content>
          <br />
          <Content variant="h6">
            HealthHarbor always help to provide the proper treatment for most of
            the get the proper cure and healthy life which cooperate
          </Content>
          <Feature>
            <MainTopic>
              <Topic>
                <FeatureImg
                  src={
                    "https://cdn.iconscout.com/icon/free/png-512/free-doctor-2349775-1955453.png?f=webp&w=256"
                  }
                  alt=""
                  width={"25px"}
                />
                <SubTopic>Covid 19 Patient Support</SubTopic>
              </Topic>
              <Topic>
                <FeatureImg
                  src={
                    "https://cdn.iconscout.com/icon/free/png-512/free-doctor-2349775-1955453.png?f=webp&w=256"
                  }
                  alt=""
                  width={"25px"}
                />
                <SubTopic>Experience Doctor</SubTopic>
              </Topic>
            </MainTopic>
            <MainTopic marginLeft={"4rem"}>
              <Topic>
                <FeatureImg
                  src={
                    "https://cdn.iconscout.com/icon/free/png-512/free-doctor-2349775-1955453.png?f=webp&w=256"
                  }
                  alt=""
                  width={"25px"}
                />
                <SubTopic>Easy Online Booking</SubTopic>
              </Topic>
              <Topic>
                <FeatureImg
                  src={
                    "https://cdn.iconscout.com/icon/free/png-512/free-doctor-2349775-1955453.png?f=webp&w=256"
                  }
                  alt=""
                  width={"25px"}
                />
                <SubTopic>Latest Machinery</SubTopic>
              </Topic>
            </MainTopic>
          </Feature>
        </Aboutus>
      </BottomContainer>
    </Box>
  );
}

export default AboutUs;
