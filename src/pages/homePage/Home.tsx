import { Box, Typography } from "@mui/material";
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

const HeroBox = styled(Box)(({ theme }) => ({
  margin: "5rem auto",
  width: "90%",

  [theme.breakpoints.down("lg")]: {
    margin: "4rem auto",
  },
  [theme.breakpoints.down("md")]: {
    margin: "3rem auto",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "2.5rem auto",
  },
}));

const SpecializationBox = styled(Box)(({ theme }) => ({
  margin: "5rem auto",
  width: "80%",

  [theme.breakpoints.down("md")]: {
    margin: "4rem auto",
    width: "90%",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "3.5rem auto",
    width: "100%",
  },
}));

const Specialization = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: theme.spacing(3),

  [theme.breakpoints.down("lg")]: {
    gap: theme.spacing(3),
  },
  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(1),
  },
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  color: "#333333",
  margin: "10rem 0 2rem 0",
  fontSize: "2.5rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.75rem",
    margin: "0.8rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.15rem",
    margin: "0.5rem 0",
  },
}));

function Home() {
  return (
    <Box>
      <HeroBox>
        <HeroSection />
      </HeroBox>
      <SpecializationBox>
        <Heading textAlign={"center"}>Categories</Heading>
        <Specialization>
          <SpecializationDesign img={heart} title={"Cardiology"} />
          <SpecializationDesign img={teeth} title={"Dentist"} />
          <SpecializationDesign img={specialized} title={"Specialized"} />
          <SpecializationDesign img={lungs} title={"Urology"} />
          <SpecializationDesign img={brain} title={"Neurology"} />
          <SpecializationDesign img={bone} title={"Orthopedic"} />
          <SpecializationDesign img={stomach} title={"Stomach"} />
          <SpecializationDesign img={medicine} title={"Medicine"} />
        </Specialization>
      </SpecializationBox>
    </Box>
  );
}

export default Home;
