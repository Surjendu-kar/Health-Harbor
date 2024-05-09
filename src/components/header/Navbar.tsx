import { Box, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/config";
import { User } from "@supabase/supabase-js";
import LogoAnimation from "../lottieAnimation/LogoAnimation";

const NavContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "0.5rem 0",
  backgroundColor: "#1D2B53",
  width: "100%",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  fontFamily: "sans-serif",
  margin: theme.spacing(0, 2),
  textDecoration: "none",
  color: "#fff",
  fontSize: "0.9  rem",
  letterSpacing: "1.5px",

  transition: "color 0.3s ease-in-out, font-size 0.3s ease-in-out",
  "&:hover": {
    fontSize: "1.05rem",
  },

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.9rem",
    "&:hover": {
      fontSize: "1rem",
    },
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
    letterSpacing: "1.2px",
    "&:hover": {
      fontSize: "0.9rem",
    },
    margin: theme.spacing(0, 1),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.53rem",
    letterSpacing: "0.7px",
    margin: theme.spacing(0, 0.5),

    "&:hover": {
      fontSize: "0.65rem",
    },
  },
}));

const MedicineStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "50px",
  height: "55px",
  [theme.breakpoints.down("lg")]: {
    width: "50px",
    height: "50px",
  },
  [theme.breakpoints.down("md")]: {
    width: "30px",
    height: "30px",
  },
  [theme.breakpoints.down("sm")]: { width: "27px", height: "27px" },
}));

const LogoLink = styled(StyledLink)(({ theme }) => ({
  fontSize: "1.15rem",
  margin: theme.spacing(0, 0.05),
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    height: "1px",
    width: "0%",
    backgroundColor: "#fff",
    transition: "all ease 1s",
  },

  "&:hover::after": {
    width: "100%",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.95rem",
    letterSpacing: "1.2px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    letterSpacing: "1px",
    margin: theme.spacing(0),
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "36px",
  height: "36px",
  border: "2px solid white",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow:
      "0 4px 8px 0 rgba(255, 255, 255, 0.40), 0 6px 20px 0 rgba(255, 255, 255, 0.19)",
  },

  [theme.breakpoints.down("lg")]: {
    width: "33px",
    height: "33px",
  },
  [theme.breakpoints.down("md")]: {
    width: "25px",
    height: "25px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "20px",
    height: "20px",
    border: "1px solid white",
  },
}));

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [doctorImage, setDoctorImage] = useState<string>("");

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user ?? null);
        console.log(session?.user);

        fetchDoctorImage(session?.user.email);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setDoctorImage("");
      }
    });

    return () => {
      // authListener?.unsubscribe();
    };
  }, []);

  const fetchDoctorImage = async (userEmail: string | undefined) => {
    if (userEmail) {
      const { data, error } = await supabase
        .from("doctorInfo")
        .select("img")
        .eq("email", userEmail);

      if (error) {
        console.error("Error fetching doctor image:", error);
      } else {
        setDoctorImage(data?.[0]?.img || "");
      }
    }
  };

  return (
    <NavContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <MedicineStyle>
          <LogoAnimation />
        </MedicineStyle>
        <LogoLink to="/">HealthHarbor</LogoLink>
      </Box>

      <Box sx={{ display: "flex" }}>
        <StyledLink to="/find-a-doctor">Find a Doctor</StyledLink>
        <StyledLink to="/service">Services</StyledLink>
        <StyledLink to="/about-us">About us</StyledLink>
        <StyledLink to="/contact">Contact</StyledLink>
      </Box>

      {user ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <StyledAvatar
            component={Link}
            to={"/profile"}
            src={doctorImage || ""}
          />
        </Box>
      ) : (
        <StyledLink to="/login">Signin</StyledLink>
      )}
    </NavContainer>
  );
};

export default Navbar;
