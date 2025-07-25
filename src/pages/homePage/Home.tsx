import { Box, Typography, keyframes } from "@mui/material";
import { motion } from "framer-motion";
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
import BestMedicalTreatmentAnimation from "../../components/lottieAnimation/BestMedicalTreatmentAnimation";
import BestMedicalStatement from "./heroSection/BestMedicalStatement";

const HeroBox = styled(motion(Box))(({ theme }) => ({
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
    margin: "0rem auto",
    height: "25vh",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0rem auto",
    height: "35vh",
    maxheight: "45vh",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0rem auto",
    height: "40vh",
    marginBottom: "1rem",
  },
}));

const SpecializationBox = styled(motion(Box))(({ theme }) => ({
  margin: "0rem auto",
  backgroundColor: "#f3f8ffb1",
  borderRadius: "30px",
  boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.28)",
  marginTop: "3rem",

  [theme.breakpoints.down("md")]: {
    maxheight: "80vh",
    marginTop: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    height: "55vh",
    marginTop: "1rem",
    borderRadius: "15px",
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
  letterSpacing: "0.85px",

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
    letterSpacing: "0.5px",
  },
}));

const Specialization = styled(motion(Box))(({ theme }) => ({
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

const GetAppointmentBox = styled(motion(Box))(({ theme }) => ({
  height: "80vh",
  backgroundColor: "#f3f8ffb1",
  borderRadius: "30px",
  boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.28)",
  margin: "3rem 0 0",

  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  padding: "0 2rem",
  [theme.breakpoints.down("lg")]: { height: "30vh"  },
  [theme.breakpoints.down("md")]: { maxheight: "60vh", padding: "1rem 0.8rem" },
  [theme.breakpoints.down("sm")]: { height: "65vh", padding: "1rem" },
}));

const BestMedicalBox = styled(motion(Box))(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  height: "85vh",
  backgroundColor: "#f3f8ffb1",
  borderRadius: "30px",
  boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.28)",
  margin: "3rem 0 0",
  [theme.breakpoints.down("lg")]: { margin: "1.5rem 0", height: "30vh" },
  [theme.breakpoints.down("md")]: { margin: "1.5rem 0", height: "70vh" },
  [theme.breakpoints.down("sm")]: {
    margin: "1rem 0",
    height: "60vh",
    borderRadius: "15px",
  },
}));

const BestMedicalHeading = styled(Typography)(({ theme }) => ({
  color: "#15285ce8",
  fontSize: "2rem",
  fontWeight: "bold",
  animation: `${fadeInAnimation} 1s ease-in-out`,
  letterSpacing: "0.5px",
  textAlign: "center",

  [theme.breakpoints.down("lg")]: {
    fontSize: "1.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.3rem",
    // margin: "0.2rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    margin: "0",
    letterSpacing: "0.5px",
    width: "80%",
  },
}));

const BestMedicalContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: { flexDirection: "column" },
}));

function Home() {
  return (
    <Box>
      <HeroBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </HeroBox>

      <SpecializationBox
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Specialization
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
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
            component={motion.div}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
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

      <GetAppointmentBox
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Box>
          <GetAppointment />
        </Box>
        <Box>
          <GetAppointmentAnimation />
        </Box>
      </GetAppointmentBox>

      <BestMedicalBox
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <BestMedicalHeading>
          Consult with our best Doctor for proper Treatment
        </BestMedicalHeading>

        <BestMedicalContainer>
          <BestMedicalTreatmentAnimation />
          <BestMedicalStatement />
        </BestMedicalContainer>
      </BestMedicalBox>
    </Box>
  );
}

export default Home;
