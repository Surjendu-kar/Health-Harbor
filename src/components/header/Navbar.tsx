import { Box, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/config";
import { User } from "@supabase/supabase-js";
import LottieAnimation from "../lottieAnimation/LottieAnimation";

const NavContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "0.5rem 0",
  backgroundColor: "#929dff",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(0, 2),
  textDecoration: "none",
  color: "#000",
  fontSize: "17px",

  transition: "color 0.3s ease-in-out, font-size 0.3s ease-in-out",

  "&:hover": {
    color: "#fff",
    fontSize: "19px",
  },
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: "36px",
  height: "36px",
}));

const Navbar = () => {
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
    <NavContainer>
      <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <LottieAnimation />
        <StyledLink to="/">All in One Healthcare</StyledLink>
      </Box>
      <Box>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="">Services</StyledLink>
        <StyledLink to="">Find a Doctor</StyledLink>
        <StyledLink to="">Contact</StyledLink>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <StyledAvatar
          component={Link}
          to={"/profile"}
          src={user?.user_metadata?.avatar_url}
        />
      </Box>
    </NavContainer>
  );
};

export default Navbar;
