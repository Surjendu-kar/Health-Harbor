import { useEffect, useState } from "react";
import { supabase } from "../../supabase/config";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import loginImg from "../../assets/loginImg/portrait-doctor.jpg";
import GoogleLogo from "../../assets/google svg/googleLogo.svg";
import { ToastContainer, toast } from "react-toastify";

const MainContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));

const Container = styled(Box)(() => ({
  display: "flex",
  boxShadow: "0 5px 5px rgba(0,0,0,.5)",
  marginTop: "3rem",
  borderRadius: "5px",
  borderTopRightRadius: "20%",
  borderBottomLeftRadius: "20%",
  overflow: "hidden",
}));

const ImgContainer = styled(Box)(() => ({}));

const LoginContainer = styled(Box)(() => ({
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#d3d3d378",
  color: "#000",
}));

const DoctorImg = styled("img")(() => ({
  width: "350px",
  height: "500px",
}));
const GoggleImg = styled("img")(() => ({
  width: "20px",
  height: "20px",
}));

const Heading = styled(Typography)(() => ({
  fontSize: "2.5rem",
}));
const Title = styled(Typography)(() => ({
  fontSize: "1rem",
}));
const TextTitle = styled(Typography)(() => ({
  fontSize: "0.75rem",
}));

const UserTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "30px",
  boxShadow: "0 5px 5px rgba(0,0,0,0.1)",

  "&:hover .MuiInputLabel-root": {
    color: "#000", // Change label color to black on hover
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none", // Remove the border
    },
    "&:hover fieldset": {
      border: "none", // Remove the border on hover
    },
    "&.Mui-focused fieldset": {
      border: "none", // Remove the border when the input is focused
    },
    "& input": {
      padding: "0.85rem", // Remove padding from the input
    },
  },
  "& .MuiInputLabel-root": {
    // Target the label
    fontSize: "0.8rem",
  },
}));

const PasswordTextField = styled(UserTextField)(({ theme }) => ({
  marginTop: "0.8rem",
}));

const CustomBtn = styled("button")(() => ({
  width: "70%",
  border: "none",
  padding: "0.65rem 0",
  borderRadius: "30px",
  color: "#fff",
  backgroundColor: "#FDA403",
  cursor: "pointer",
  fontSize: "1em",
  boxShadow: "0 5px 5px rgba(0,0,0,0.2)",
  transition: "background-color 0.5s ease, color 0.5s ease",

  "&:hover": {
    color: "#FDA403",
    backgroundColor: "#fff",
    transition: "background-color 0.5s ease, color 0.5s ease",
  },
}));
export function LoginWithGoogle() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

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
    if (user && selectedRole) {
      if (selectedRole === "User") {
        navigate("/");
      } else if (selectedRole === "Doctor") {
        navigate("/profile");
      }
    }
  }, [user, selectedRole, navigate]);

  const handleRoleSelection = (role: string) => {
    console.log(`User selected role: ${role}`);
    setSelectedRole(role);
  };

  return (
    <>
      <ToastContainer />

      <MainContainer>
        <Container>
          <ImgContainer>
            <DoctorImg src={loginImg} alt="" />
          </ImgContainer>

          <LoginContainer>
            <Box textAlign={"center"}>
              <Heading>Hey Welcome !</Heading>
              <Title>Login Your Account</Title>
            </Box>
            <Box sx={{ margin: "2rem 0 0", width: "90%" }}>
              <UserTextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <PasswordTextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                width: "85%",
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
                marginTop: "0.25rem",
              }}
            >
              <TextTitle onClick={() => navigate("/signup")}>
                Don't have an account? Sign up
              </TextTitle>
              <TextTitle>Forgot password?</TextTitle>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                margin: "2rem 0",
              }}
            >
              <CustomBtn
                type="submit"
                onClick={() => {
                  toast.warning(" currently in development phase.");
                  toast.warning(" you can login with google.");
                }}
              >
                Login
              </CustomBtn>

              <TextTitle margin={"0.15rem 0"}>or</TextTitle>
              <CustomBtn onClick={handleLoginWithGoogle}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  gap={1}
                >
                  <GoggleImg src={GoogleLogo} alt="Sign in with Google" />
                  <Typography>Sign in with Google</Typography>
                </Box>
              </CustomBtn>
            </Box>
          </LoginContainer>
        </Container>
      </MainContainer>
    </>
  );
}
