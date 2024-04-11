import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "2.2rem",
  fontWeight: "bold",
  color: "#15285ce8",
  [theme.breakpoints.down("lg")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    textAlign: "center",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  color: "#030d28ba",
  paddingLeft: "5px",
  margin: "1rem 0",
  letterSpacing: "0.8px",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.9rem",
    margin: "1rem 0",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
    margin: "0.75rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.65rem",
    paddingLeft: "1px",
    margin: "0.5rem 0",
    letterSpacing: "0.5px",
  },
}));

const UnorderedList = styled("ul")(({ theme }) => ({
  margin: 0,
  paddingInlineStart: "20px",
}));

const ListItem = styled("li")(({ theme }) => ({
  margin: 0,
  color: "#000",
}));

const GetAppointmentBtn = styled(Typography)(({ theme }) => ({
  display: "inline",
  fontSize: "1.25rem",
  backgroundColor: "#deeaff8f",
  padding: "0.8rem",
  borderRadius: "7px",
  // border: "1px solid black",
  boxShadow: "1px 5px 5px rgba(0, 0, 0, 0.2)",
  lineHeight: 2.5,
  cursor: "pointer",
  transition: "font-size 0.2s ease",

  "&:hover": {
    fontSize: "1.3rem",
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
    fontSize: "0.55rem",
    padding: "0.4rem",
    borderRadius: "3px",
    letterSpacing: "0.7px",
  },
}));

function GetAppointment() {
  const navigate = useNavigate();
  return (
    <Box>
      <Heading>Easily Can Get An Appointment</Heading>
      <Title>
        <UnorderedList>
          <ListItem>
            Click on the <b>"Find Doctors"</b> or <b>"Get Appointment"</b>{" "}
            button.
          </ListItem>
          <ListItem>
            Search for doctors based on:
            <UnorderedList>
              <ListItem>Location</ListItem>
              <ListItem>
                Specialization (e.g. cardiology, urology, etc.)
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>View search results.</ListItem>
          <ListItem>
            Click on a specific doctor to view detailed information, including:
            <UnorderedList>
              <ListItem>Education details</ListItem>
              <ListItem>Experience</ListItem>
              <ListItem>Others' feedbacks</ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
      </Title>
      <GetAppointmentBtn onClick={() => navigate("/find-a-doctor")}>
        Get Appointment
      </GetAppointmentBtn>
    </Box>
  );
}

export default GetAppointment;
