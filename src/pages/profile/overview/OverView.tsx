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
            <Typography>About of {user?.user_metadata?.full_name}</Typography>
            <Typography>{fetchedData.about}</Typography>
          </Contain>

          {/* Education */}
          <Contain>
            <Typography>Education</Typography>
          </Contain>

          {/* Experience */}
          <Contain>
            <Typography>Experience</Typography>
          </Contain>
        </Box>
      )}
    </MainContainer>
  );
}

export default OverView;
