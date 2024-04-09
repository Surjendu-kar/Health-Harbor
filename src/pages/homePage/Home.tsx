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
    margin: "3rem auto",
    height: "80vh",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0rem auto",
    height: "55vh",
    marginBottom: "1rem",
  },
}));

const SpecializationBox = styled(Box)(({ theme }) => ({
  margin: "0rem auto",
  backgroundColor: "#f3f8ffb1",
  borderRadius: "30px",
  boxShadow: "1px 5px 8px rgba(0, 0, 0, 0.2)",

  [theme.breakpoints.down("md")]: {
    height: "80vh",
  },
  [theme.breakpoints.down("sm")]: {
    height: "90vh",
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
  color: "#333333cc",
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
    fontSize: "0.8rem",
    margin: "0.5rem 0",
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
    padding: "3rem",
  },
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
    padding: "0",
    paddingTop: "0.5rem",
    display: "block",
  },
}));

const DefaultBox1 = styled(Box)(({ theme }) => ({
  height: "70vh",
  backgroundColor: "#f3f8ffb1",
  borderRadius: "30px",
  boxShadow: "1px 5px 8px rgba(0, 0, 0, 0.2)",
  marginBottom: "3rem",

  [theme.breakpoints.down("md")]: {marginBottom: "2rem",},
  [theme.breakpoints.down("sm")]: {marginBottom: "1rem",},
}));
const DefaultBox2 = styled(DefaultBox1)(({ theme }) => ({
  marginBottom: "0",
  marginTop: "3rem",

  [theme.breakpoints.down("md")]: { marginTop: "2rem" },
  [theme.breakpoints.down("sm")]: { marginTop: "1rem" },
}));

function Home() {
  return (
    <Box>
      <HeroBox>
        <HeroSection />
      </HeroBox>
      <DefaultBox1>other details...</DefaultBox1>
      <SpecializationBox>
        <Specialization>
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
        </Specialization>
      </SpecializationBox>
      <DefaultBox2>other details...</DefaultBox2>
    </Box>
  );
}

export default Home;
