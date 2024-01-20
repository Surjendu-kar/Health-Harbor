import { Typography, Box, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const NavContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center", // Ensure vertical alignment
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
  return (
    <NavContainer>
      <Box>
        <Logo>All in One Healthcare</Logo>
      </Box>
      <Box>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="">Services</StyledLink>
        <StyledLink to="">Find a Doctor</StyledLink>
        <StyledLink to="">Contact</StyledLink>
      </Box>

      <Box component={Link} to={"/doctor"}>
        <StyledAvatar src="/broken-image.jpg" />
      </Box>
    </NavContainer>
  );
};

export default Navbar;
