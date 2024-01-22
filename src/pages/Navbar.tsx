import { Typography, Box, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/config";
import { User } from "@supabase/supabase-js";
import LottieAnimation from "../components/LottieAnimation";

const NavContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  backgroundColor: "#f0eeea",
}));

const Logo = styled(Typography)(() => ({
  // fontSize
}));

const StyledLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(0, 2),
  textDecoration: "none",
  color: "#000",
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: "36px",
  height: "36px",
}));

const Navbar = () => {
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <NavContainer>
      <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <LottieAnimation />
        <Logo onClick={() => navigate("/")}>All in One Healthcare</Logo>
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
          to={"/doctor"}
          src={user?.user_metadata?.avatar_url}
        />
        {user && (
          <>
            <Typography variant="h4" sx={{ fontFamily: "none" }}>/</Typography>
            <Typography
              onClick={handleLogout}
              variant="p"
              sx={{ textDecoration: "none", color: "#000" }}
            >
              Logout
            </Typography>
          </>
        )}
      </Box>
    </NavContainer>
  );
};

export default Navbar;
