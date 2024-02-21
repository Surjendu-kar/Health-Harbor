import { Box, Typography, styled } from "@mui/material";
import defaultImg from "../../../assets/defaultImg.jpg";
import { User } from "@supabase/supabase-js";

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

const Img = styled("img")(({ theme }) => ({
  height: "150px",
  width: "150px",
  borderRadius: "10px",

  [theme.breakpoints.down("lg")]: {
    height: "120px",
    width: "120px",
  },
  [theme.breakpoints.down("md")]: {
    height: "90px",
    width: "90px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "50px",
    width: "50px",
  },
}));
const ImgBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
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
const Name = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
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
const Rating = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
}));

const Contain = styled(Typography)(() => ({
  margin: "1rem 0",
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "1.05rem",
  marginBottom: "0.5rem",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.95rem",
    marginBottom: "0.3rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.85rem",
    marginBottom: "0.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.55rem",
    marginBottom: "0.1rem",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "0.85rem",
  [theme.breakpoints.down("lg")]: { fontSize: "0.7rem" },
  [theme.breakpoints.down("md")]: { fontSize: "0.6rem" },
  [theme.breakpoints.down("sm")]: { fontSize: "0.35rem" },
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
    padding: "0.3rem 1rem 0.3rem 1rem",
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
    padding: "0.3rem 1rem 0.3rem 1rem",
    flexDirection: "column",
    alignItems: "start",
    width: "100%",
    ".MuiTypography-root": {
      // Target all Typography components inside ExperienceBox
      textAlign: "left",
      width: "100%",
    },
  },
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  fontWeight: "bold",
  [theme.breakpoints.down("lg")]: { fontSize: "0.8rem" },
  [theme.breakpoints.down("md")]: { fontSize: "0.7rem" },
  [theme.breakpoints.down("sm")]: { fontSize: "0.45rem" },
}));

type DoctorInfo = {
  id: number;
  name: string;
  email: string;
  phoneno: string;
  bio: string;
  gender: string;
  specialization: string;
  price: number;
  address: string;
  city: string;
  qualifications: string[];
  experiences: string[];
  timeSlot: string[];
  about: string;
};

function OverView({
  user,
  fetchedData,
}: {
  user: User;
  fetchedData: DoctorInfo | null;
}) {
  let qualificationsArray;
  if (fetchedData && typeof fetchedData.qualifications === "string") {
    try {
      qualificationsArray = JSON.parse(fetchedData.qualifications);
    } catch (error) {
      console.error("Error parsing qualifications", error);
      qualificationsArray = []; // Default to an empty array in case of error
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
      experiencesArray = []; // Default to an empty array in case of error
    }
  } else if (fetchedData && Array.isArray(fetchedData.experiences)) {
    experiencesArray = fetchedData.experiences;
  }

  return (
    <MainContainer>
      {/* Img & Name */}
      <ImgBox>
        {/* Img */}
        <Img src={user?.user_metadata?.avatar_url || defaultImg} alt="uimg" />
        {user && fetchedData && (
          <NameRatingBox>
            {/* Name */}
            <Name>{user?.user_metadata?.full_name}</Name>
            {/* Rating */}
            {/* <Rating>Rating ..</Rating> */}
          </NameRatingBox>
        )}
      </ImgBox>

      {user && fetchedData && (
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
                      -{" "}
                      {qualification.endDate
                        ? new Date(qualification.endDate).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short" }
                          )
                        : "Present"}
                    </DateText>
                    <Title>
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
              }}
            >
              {experiencesArray.map((experience, index) => (
                <ExperienceBox key={index} sx={{}}>
                  <DateText sx={{ color: "#009cff" }}>
                    {new Date(experience.startDate).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "short" }
                    )}{" "}
                    -{" "}
                    {experience.endDate
                      ? new Date(experience.endDate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short" }
                        )
                      : "Present"}
                  </DateText>
                  <Title>{experience.position}</Title>
                  <Title>{experience.hospital}</Title>
                </ExperienceBox>
              ))}
            </Box>
          </Contain>
        </Box>
      )}
    </MainContainer>
  );
}

export default OverView;
