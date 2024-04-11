import React from "react";
import { Box, Typography, styled } from "@mui/material";

const Contain = styled(Typography)(() => ({
  margin: "1rem 0",
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "1.05rem",
  marginBottom: "0.5rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.1rem",
    marginBottom: "0.3rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.9rem",
    marginBottom: "0.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
    marginBottom: "0.1rem",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "0.85rem",
  color: "#626262",
  [theme.breakpoints.down("lg")]: { fontSize: "0.8rem" },
  [theme.breakpoints.down("md")]: { fontSize: "0.77rem" },
  [theme.breakpoints.down("sm")]: { fontSize: "0.6rem" },
}));

const EducationBox = styled(Box)(({ theme }) => ({
  padding: "1rem 7rem 1rem 3rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#deeaff8f",
  borderRadius: "10px",
  marginTop: "1rem",
  [theme.breakpoints.down("lg")]: {
    padding: "0.8rem 4.5rem 0.8rem 2rem",
    marginTop: "0.7rem",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0.7rem 1.5rem 0.7rem 1.5rem",
    marginTop: "0.5rem",
    borderRadius: "5px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem 1rem 0.5rem 1rem",
    marginTop: "0.3rem",
  },
}));

const ExperienceBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#deeaff8f",
  borderRadius: "10px",
  padding: "1.5rem 7rem 1.5rem 3rem",
  marginBottom: "0.3rem",
  [theme.breakpoints.down("lg")]: {
    padding: "1.15rem 4.5rem 1.15rem 2rem",
  },
  [theme.breakpoints.down("md")]: {
    padding: "1rem 1.3rem 1rem 1.5rem",
    borderRadius: "5px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem 1rem 0.5rem 1rem",
    flexDirection: "column",
    alignItems: "start",
    marginBottom: "0rem",
    width: "100%",
    ".MuiTypography-root": {
      textAlign: "left",
      width: "100%",
    },
  },
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  fontWeight: "bold",
  [theme.breakpoints.down("lg")]: { fontSize: "0.85rem" },
  [theme.breakpoints.down("md")]: { fontSize: "0.75rem" },
  [theme.breakpoints.down("sm")]: { fontSize: "0.6rem" },
}));

function ViewDetails({ fetchedData }) {
  let qualificationsArray;
  if (fetchedData && typeof fetchedData.qualifications === "string") {
    try {
      qualificationsArray = JSON.parse(fetchedData.qualifications);
    } catch (error) {
      console.error("Error parsing qualifications", error);
      qualificationsArray = [];
    }
  } else if (fetchedData && Array.isArray(fetchedData.qualifications)) {
    qualificationsArray = fetchedData.qualifications;
  }

  let experiencesArray;
  if (fetchedData && typeof fetchedData.experiences === "string") {
    try {
      experiencesArray = JSON.parse(fetchedData.experiences);
    } catch (error) {
      console.error("Error parsing experiences", error);
      experiencesArray = [];
    }
  } else if (fetchedData && Array.isArray(fetchedData.experiences)) {
    experiencesArray = fetchedData.experiences;
  }

  return (
    <Box>
      {/* About */}
      <Contain>
        <Heading>About</Heading>
        <Title>{fetchedData.about}</Title>
      </Contain>

      {/* Education */}
      <Contain>
        <Heading>Education</Heading>
        <Box>
          {qualificationsArray &&
            qualificationsArray.map((qualification, index) => (
              <EducationBox key={index}>
                <DateText sx={{ color: "#009cff" }}>
                  {new Date(qualification.startDate).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "short" }
                  )}{" "}
                  -{"  "}
                  {qualification.endDate
                    ? new Date(qualification.endDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "short" }
                      )
                    : "Present"}
                </DateText>
                <Title sx={{ color: "#000" }}>
                  {qualification.degree}, {qualification.university}
                </Title>
              </EducationBox>
            ))}
        </Box>
      </Contain>

      {/* Experience */}
      <Contain>
        <Heading>Experience</Heading>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          {experiencesArray &&
            experiencesArray.map((experience, index) => (
              <ExperienceBox key={index}>
                <DateText sx={{ color: "#009cff" }}>
                  {new Date(experience.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}{" "}
                  -{" "}
                  {experience.endDate
                    ? new Date(experience.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })
                    : "Present"}
                </DateText>
                <Title sx={{ color: "#000" }}>{experience.position}</Title>
                <Title sx={{ color: "#000" }}>{experience.hospital}</Title>
              </ExperienceBox>
            ))}
        </Box>
      </Contain>
    </Box>
  );
}

export default ViewDetails;
