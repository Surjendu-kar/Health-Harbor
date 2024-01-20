import { Typography, Box, Avatar, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/config";
import { User } from "@supabase/supabase-js";
import LottieAnimation from "../components/LottieAnimation";

const NavContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  marginTop: "1rem",
  marginBottom: "2rem",
}));

const Logo = styled(Typography)(() => ({
  // fontSize
}));

const StyledLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(0, 2),
  textDecoration: "none",
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

      <Box
        component={Link}
        to={"/doctor"}
        sx={{ display: "flex", alignItems: "center", gap: 4 }}
      >
        <StyledAvatar src={user?.user_metadata?.avatar_url} />
        {user && (
          <Typography
            onClick={handleLogout}
            variant="p"
            sx={{ textDecoration: "none" }}
          >
            Logout
          </Typography>
        )}
      </Box>
    </NavContainer>
  );
};

export default Navbar;
