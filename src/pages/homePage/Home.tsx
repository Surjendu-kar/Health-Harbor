import { Box, Typography, keyframes } from "@mui/material";
import HeroSection from "./heroSection/HeroSection";
import SpecializationDesign from "../../components/specializationDesign/SpecializationDesign";
import heart from "../../assets/specializationImgs/heart.gif";
import bone from "../../assets/specializationImgs/bone.gif";
import brain from "../../assets/specializationImgs/brain.gif";
import lungs from "../../assets/specializationImgs/lungs.gif";
import medicine from "../../assets/specializationImgs/medicine.gif";
import specialized from "../../assets/specializationImgs/specialized.gif";
import stomach from "../../assets/specializationImgs/stomach.gif";
import teeth from "../../assets/specializationImgs/teeth.gif";
import { styled } from "@mui/system";
import SpecializationAnimation from "../../components/lottieAnimation/SpecializationAnimation";
import doctorImg from "../../assets/doctorImg.png";
import GetAppointment from "./heroSection/GetAppointment";
import GetAppointmentAnimation from "../../components/lottieAnimation/GetAppointmentAnimation";

const HeroBox = styled(Box)(({ theme }) => ({
  // margin: "5rem auto",
  // width: "90%",
  height: "90vh",
  // padding: "6rem 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "3rem",
  boxShadow: "1px 5px 8px rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
  backgroundColor: "#f3f8ffb1",

  [theme.breakpoints.down("lg")]: {
    margin: "4rem auto",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0rem auto",
    height: "50vh",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0rem auto",
    height: "40vh",
    marginBottom: "1rem",
  },
}));

const SpecializationBox = styled(Box)(({ theme }) => ({
  margin: "0rem auto",
  backgroundColor: "#f3f8ffb1",
  borderRadius: "30px",
  boxShadow: "1px 5px 8px rgba(0, 0, 0, 0.2)",
  marginTop: "3rem",

  [theme.breakpoints.down("md")]: {
    maxheight: "80vh",
    marginTop: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    height: "55vh",
    marginTop: "1rem",
  },
}));

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Heading = styled(Typography)(({ theme }) => ({
  color: "#15285ce8",
  fontSize: "2rem",
  fontWeight: "bold",
  animation: `${fadeInAnimation} 1s ease-in-out`,

  [theme.breakpoints.down("lg")]: {
    fontSize: "1.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
    // margin: "0.2rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    margin: "0.5rem 0",
    padding: "1rem",
    letterSpacing:'0.5px',
  },
}));

const Specialization = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "90%",
  margin: "0 auto",
  padding: "4rem",
  gap: theme.spacing(3),

  [theme.breakpoints.down("lg")]: {
    gap: theme.spacing(3),
    padding: "2rem",
  },
  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(1),
  },
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
    padding: "0",
    paddingTop: "0.5rem",
    display: "block",
  },
}));

const DefaultBox = styled(Box)(({ theme }) => ({
  height: "80vh",
  backgroundColor: "#f3f8ffb1",
  borderRadius: "30px",
  boxShadow: "1px 5px 8px rgba(0, 0, 0, 0.2)",
  margin: "3rem 0 0",

  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",

  [theme.breakpoints.down("md")]: { margin: "2rem 0", height: "45vh" },
  [theme.breakpoints.down("sm")]: { margin: "1rem 0", height: "40vh" },
}));

const GetAppointmentBox = styled(DefaultBox)(({ theme }) => ({
  flexWrap: "wrap",

  [theme.breakpoints.down("md")]: { height: "60vh" },
  [theme.breakpoints.down("sm")]: { height: "55vh", padding: "0.5rem" },
}));

// const Img = styled("img")(({ theme }) => ({
//   height: "350px",
//   width: "350px",
//   borderRadius: "30px",

//   [theme.breakpoints.down("lg")]: {
//     height: "300px",
//     width: "480px",
//   },
//   [theme.breakpoints.down("md")]: {
//     height: "200px",
//     width: "300px",
//     borderRadius: "20px",
//   },
//   [theme.breakpoints.down("sm")]: {
//     height: "150px",
//     width: "200px",
//     borderRadius: "10px",
//   },
// }));

function Home() {
  return (
    <Box>
      <HeroBox>
        <HeroSection />
      </HeroBox>

      <SpecializationBox>
        <Specialization>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <SpecializationAnimation />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <Heading textAlign={"center"}>
                Different types of Department we have for your Healthcare{" "}
              </Heading>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SpecializationDesign img={heart} title={"Cardiology"} />
              <SpecializationDesign img={teeth} title={"Dentist"} />
              <SpecializationDesign img={specialized} title={"Specialized"} />
              <SpecializationDesign img={lungs} title={"Urology"} />
              <SpecializationDesign img={brain} title={"Neurology"} />
              <SpecializationDesign img={bone} title={"Orthopedic"} />
              <SpecializationDesign img={stomach} title={"Stomach"} />
              <SpecializationDesign img={medicine} title={"Medicine"} />
            </Box>
          </Box>
        </Specialization>
      </SpecializationBox>

      <GetAppointmentBox>
        <Box>
          <GetAppointment />
        </Box>
        <Box>
          <GetAppointmentAnimation />
        </Box>
      </GetAppointmentBox>

      <DefaultBox>other details...</DefaultBox>
    </Box>
  );
}

export default Home;
