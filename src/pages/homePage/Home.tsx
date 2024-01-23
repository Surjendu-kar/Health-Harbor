import { useEffect, useState } from "react";
import { supabase } from "../../supabase/config";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Box } from "@mui/material";

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        navigate("/login");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  console.log(user);

  return (
    <Box height={"100vh"}>
      {user && <Box></Box>}
      Home
    </Box>
  );
}

export default Home;
