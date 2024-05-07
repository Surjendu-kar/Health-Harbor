import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "h5",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
}));

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

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row",
    width: "40%",
    paddingRight: "1rem",
  },
}));
const Img = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    height: "400px",
  },
}));

const ServiceBox = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  color: "#030d28ba",
  paddingLeft: "5px",
  margin: "5rem",
  letterSpacing: "1px",
  marginTop: "5rem",

  [theme.breakpoints.down("sm")]: {
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
  },
}));

const MakeAppointment = styled(Typography)(({ theme }) => ({
  display: "inline",
  fontSize: "1rem",
  backgroundColor: "#415da1",
  color: "white",
  padding: "0.8rem",
  borderRadius: "7px",
  boxShadow: "1px 5px 5px rgba(0, 0, 0, 0.2)",
  lineHeight: 2.5,
  cursor: "pointer",
  transition: "font-size 0.2s ease",
  letterSpacing: "0.9px",

  "&:hover": {
    fontSize: "1.05rem",
    boxShadow: "1px 7px 4px rgba(0, 0, 0, 0.2)",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "1rem",
    padding: "0.7rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
    padding: "0.4rem",
    borderRadius: "5px",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "auto",
    fontSize: "0.6rem",
    padding: "0.4rem",
    borderRadius: "5px",
    letterSpacing: "0.7px",
    "&:hover": {
      fontSize: "0.65rem",
      boxShadow: "1px 7px 4px rgba(0, 0, 0, 0.2)",
    },
  },
}));

function Service() {
  const navigate = useNavigate();
  return (
    <Box>
      <TopContainer>
        <SubHeading variant="h3">Our Services</SubHeading>
        <br />
        <Content variant="h6" textAlign={"center"}>
          HealthHarbor always help to provide proper treatment <br />
          for all of get proper cure and healthy life which is the most focus
          thing.
        </Content>
      </TopContainer>
      <BottomContainer>
        <ImageContainer>
          <Img src="https://img.freepik.com/premium-photo/cartoon-doctor-with-brown-hair-glasses-is-wearing-white-coat-stethoscope_605022-39752.jpg?w=360" />
        </ImageContainer>

        <ServiceBox>
          <Heading variant="h5" margin={"auto"}>
            TRUSTED SERVICE
          </Heading>
          <br />
          <SubHeading variant="h3">
            Provide best Treatment with expert Doctors
          </SubHeading>
          <br />
          <Content variant="h6">
            HealthHarbor always help to provide proper treatment for most of get
            the proper cure and healthy life which is the cooperate focus thing
            for us patient our main proprity services.
          </Content>
          <br />
          <MakeAppointment onClick={() => navigate("/find-a-doctor")}>
            Make an Appointment
          </MakeAppointment>
        </ServiceBox>
      </BottomContainer>
    </Box>
  );
}
export default Service;
