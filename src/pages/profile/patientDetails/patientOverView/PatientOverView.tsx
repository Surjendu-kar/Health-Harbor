import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
const MainContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  margin: "2rem 0",
  [theme.breakpoints.down("lg")]: {
    margin: "0",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0",
  },
}));

function PatientOverView({ user, fetchedData }) {
  return (
    <MainContainer>
      patient overview -- <b>currently in development phase.</b>
    </MainContainer>
  );
}

export default PatientOverView;
