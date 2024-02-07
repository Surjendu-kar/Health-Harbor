import { useEffect, useState } from "react";
import { supabase } from "../../supabase/config";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Box } from "@mui/material";
import HeroSection from "./heroSection/HeroSection";

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

  console.log(user);

  return (
    <Box height={"100vh"}>
      {user && <Box></Box>}
      <HeroSection />
    </Box>
  );
}

export default Home;
