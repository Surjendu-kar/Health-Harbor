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
  backgroundColor: "#1D2B53",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(0, 2),
  textDecoration: "none",
  color: "#fff",
  fontSize: "17px",
  letterSpacing: "1.5px",

  transition: "color 0.3s ease-in-out, font-size 0.3s ease-in-out",

  "&:hover": {
    fontSize: "20px",
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
        <StyledLink to="/" sx={{ fontSize: "19px", margin: "0" }}>
          HealthHarbor
        </StyledLink>
      </Box>
      <Box>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/find-doctor">Find a Doctor</StyledLink>
        <StyledLink to="/service">Services</StyledLink>
        <StyledLink to="/about-us">About us</StyledLink>
        <StyledLink to="/contact">Contact</StyledLink>
      </Box>

      {user && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <StyledAvatar
            component={Link}
            to={"/profile"}
            src={user ? user?.user_metadata?.avatar_url : ""}
          />
        </Box>
      )}
    </NavContainer>
  );
};

export default Navbar;
