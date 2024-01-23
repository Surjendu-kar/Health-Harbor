import { Box, Typography, styled } from "@mui/material";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/config";
import defaultImg from "../../../assets/defaultImg.jpg";

const MainContainer = styled(Box)(() => ({
  width: "50%",
  marginTop: "2rem",
}));
const ImgName = styled(Box)(() => ({
  width: "50%",
  marginTop: "2rem",
}));

const Img = styled("img")(() => ({
  height: "150px",
  width: "150px",
  borderRadius: "10px",
}));

function OverView() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  return (
    <MainContainer>
      {/* Img & Name */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        {/* Img */}
        <Img
          // src={user?.user_metadata?.avatar_url || defaultImg}
          src={defaultImg}
          alt="uimg"
        />
        <Box>
          {/* Name */}
          <Typography>{user?.user_metadata?.full_name}</Typography>
          {/* Rating */}
          <Typography>Rating ..</Typography>
        </Box>
      </Box>

      {/* About */}

      {/* Education */}
      <Box>
        <Typography>Education</Typography>
      </Box>

      {/* Experience */}
      <Box>
        <Typography>Experience</Typography>
      </Box>
    </MainContainer>
  );
}

export default OverView;
