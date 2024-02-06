import { Box, Typography, styled } from "@mui/material";
import defaultImg from "../../../assets/defaultImg.jpg";
import { User } from "@supabase/supabase-js";

const MainContainer = styled(Box)(() => ({
  width: "50%",
  margin: "2rem 0",
}));

const Img = styled("img")(() => ({
  height: "150px",
  width: "150px",
  borderRadius: "10px",
}));
const Contain = styled(Typography)(() => ({
  margin: "1rem 0",
}));
const Heading = styled(Typography)(() => ({
  fontSize: "1.05rem",
  marginBottom: "1rem",
}));
const DateText = styled(Typography)(() => ({
  fontSize: "0.9rem",
}));
const Title = styled(Typography)(() => ({
  fontSize: "0.85rem",
}));
type DoctorInfo = {
  id: number;
  name: string;
  email: string;
  phoneNo: string;
  bio: string;
  gender: string;
  specialization: string;
  price: number;
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        {/* Img */}
        <Img src={user?.user_metadata?.avatar_url || defaultImg} alt="uimg" />
        {user && fetchedData && (
          <Box>
            {/* Name */}
            <Typography>{user?.user_metadata?.full_name}</Typography>
            {/* Rating */}
            <Typography>Rating ..</Typography>
          </Box>
        )}
      </Box>

      {user && fetchedData && (
        <Box>
          {/* About */}
          <Contain>
            <Heading sx={{ marginBottom: "0.25rem" }}>
              About of{" "}
              <Typography
                sx={{
                  display: "inline",
                  color: "#009cff",
                  fontSize: "1.15rem",
                }}
              >
                {user?.user_metadata?.full_name}
              </Typography>
            </Heading>
            <Title>{fetchedData.about}</Title>
          </Contain>

          {/* Education */}
          <Contain>
            <Heading>Education</Heading>
            <Box>
              {qualificationsArray &&
                qualificationsArray.map((qualification, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: "1rem 5rem 1rem 3rem",
                      display: "flex",
                      justifyContent: "space-between",
                      backgroundColor: "#deeaff8f",
                      borderRadius: "10px",
                      marginTop: "1rem",
                    }}
                  >
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
                  </Box>
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
                <Box
                  key={index}
                  sx={{
                    // flexBasis: "30%",
                    backgroundColor: "#deeaff8f",
                    borderRadius: "10px",
                    padding: "1.5rem 10rem 1.5rem 3rem",
                  }}
                >
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
                </Box>
              ))}
            </Box>
          </Contain>
        </Box>
      )}
    </MainContainer>
  );
}

export default OverView;
