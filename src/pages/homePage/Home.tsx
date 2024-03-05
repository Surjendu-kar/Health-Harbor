import { useEffect, useState } from "react";
import { supabase } from "../../supabase/config";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Box } from "@mui/material";
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

const SpecializationBox = styled(Box)(({ theme }) => ({
  margin: "5rem auto",
  width: "80%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: theme.spacing(3),

  [theme.breakpoints.down("lg")]: {
    gap: theme.spacing(3),
    margin: "4rem auto",
  },
  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(2),
    margin: "2.5rem auto",
  },
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
    margin: "1rem auto",
  },
}));

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      // Navigate to login if there is no user
      if (!user) {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    };

    getUser();
  }, [navigate]);

  // console.log(user);

  return (
    <Box>
      {user && <Box></Box>}
      <Box>
        <HeroSection />
      </Box>

      <SpecializationBox>
        <SpecializationDesign img={heart} title={"Cardiology"} />
        <SpecializationDesign img={teeth} title={"Dentist"} />
        <SpecializationDesign img={specialized} title={"Specialized"} />
        <SpecializationDesign img={lungs} title={"Urology"} />
        <SpecializationDesign img={brain} title={"Neurology"} />
        <SpecializationDesign img={bone} title={"Orthopedic"} />
        <SpecializationDesign img={stomach} title={"Stomach"} />
        <SpecializationDesign img={medicine} title={"Medicine"} />
      </SpecializationBox>
    </Box>
  );
}

export default Home;
