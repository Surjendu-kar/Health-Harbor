import { useEffect, useState } from "react";
import { supabase } from "../../supabase/config";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import loginImg from "../../assets/loginImg/portrait-doctor.jpg";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";

const MainContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  boxShadow: "0 5px 5px rgba(0,0,0,.5)",
  marginTop: "3rem",
  borderRadius: "5px",
  borderTopRightRadius: "20%",
  borderBottomLeftRadius: "20%",
  overflow: "hidden",

  [theme.breakpoints.down("lg")]: {
    marginTop: "2.8rem",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "1rem 0.5rem",
  },
}));

const ImgContainer = styled(Box)(() => ({}));

const LoginContainer = styled(Box)(({ theme }) => ({
  maxWidth: "450px",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#d3d3d378",
  color: "#000",

  [theme.breakpoints.down("md")]: { padding: "0.8rem", maxWidth: "300px" },
  [theme.breakpoints.down("sm")]: { padding: "0rem", maxWidth: "250px" },
}));

const DoctorImg = styled("img")(({ theme }) => ({
  width: "350px",
  height: "500px",
  [theme.breakpoints.down("md")]: { width: "250px", height: "400px" },
  [theme.breakpoints.down("sm")]: { width: "150px", height: "230px" },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "2.25rem",

  [theme.breakpoints.down("lg")]: { fontSize: "2.15rem" },
  [theme.breakpoints.down("md")]: { fontSize: "1.8rem" },
  [theme.breakpoints.down("sm")]: { fontSize: "1.2rem" },
}));

const TextTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  [theme.breakpoints.down("lg")]: { fontSize: "0.75rem" },
  [theme.breakpoints.down("md")]: { fontSize: "0.6rem" },
  [theme.breakpoints.down("sm")]: { fontSize: "0.45rem" },
}));

const DoctorPatient = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  [theme.breakpoints.down("lg")]: { fontSize: "0.8rem" },
  [theme.breakpoints.down("md")]: { fontSize: "0.65rem" },
  [theme.breakpoints.down("sm")]: { fontSize: "0.5rem" },
}));

const TextFieldBox = styled(Box)(({ theme }) => ({
  margin: "1.5rem 0 0",
  width: "90%",
  [theme.breakpoints.down("md")]: { margin: "1rem 0 0" },
  [theme.breakpoints.down("sm")]: { margin: "0.5rem 0 0" },
}));

const UserTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "30px",
  boxShadow: "0 5px 5px rgba(0,0,0,0.1)",
  "&:hover .MuiInputLabel-root": {
    color: "#000",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
    "& input": {
      padding: "0.85rem",

      [theme.breakpoints.down("md")]: {
        padding: "0.65rem 0",
        fontSize: "0.75rem",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0.4rem 0",
        fontSize: "0.6rem",
      },
    },
  },

  "& .MuiInputLabel-root": {
    fontSize: "0.8rem",
    width: "100%",
    color: "rgba(0, 0, 0, 0.4)",

    [theme.breakpoints.down("md")]: { fontSize: "0.65rem" },
    [theme.breakpoints.down("sm")]: { fontSize: "0.5rem" },
  },
}));

const FormControlStyle = styled(FormControl)(({ theme }) => ({
  width: "25%",
  backgroundColor: "#fff",
  borderRadius: "10px",

  [theme.breakpoints.down("md")]: { width: "35%" },
  [theme.breakpoints.down("sm")]: { width: "25%", borderRadius: "3px" },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& .MuiSelect-select": {
    [theme.breakpoints.down("sm")]: { padding: 0 },
  },

  "& .MuiInputLabel-root": {
    fontSize: "0.8rem",
    color: "rgba(0, 0, 0, 0.4)",
    [theme.breakpoints.down("sm")]: { fontSize: "0.5rem" },
  },
  "& .MuiSelect-icon": {
    fontSize: "1rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.6rem",
      padding: "0",
    },
  },
}));

const MenuItemStyle = styled(MenuItem)(({ theme }) => ({
  fontSize: "0.8rem",
  padding: 0,
  [theme.breakpoints.down("lg")]: { fontSize: "0.8rem" },
  [theme.breakpoints.down("md")]: { fontSize: "0.65rem" },
  [theme.breakpoints.down("sm")]: { fontSize: "0.45rem" },
}));

const PasswordTextField = styled(UserTextField)(({ theme }) => ({
  marginTop: "0.8rem",
  [theme.breakpoints.down("md")]: { marginTop: "0.5rem" },
  [theme.breakpoints.down("sm")]: { marginTop: "0.3rem" },
}));

const ButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  margin: "2rem 0",
  [theme.breakpoints.down("md")]: { margin: "1.5rem 0" },
  [theme.breakpoints.down("sm")]: { margin: "0.8rem 0" },
}));

const CustomBtn = styled("button")(({ theme }) => ({
  width: "70%",
  border: "none",
  padding: "0.65rem 0",
  borderRadius: "30px",
  color: "#fff",
  backgroundColor: "#FDA403",
  cursor: "pointer",
  fontSize: "1rem",
  boxShadow: "0 5px 5px rgba(0,0,0,0.2)",
  transition: "background-color 0.5s ease, color 0.5s ease",

  [theme.breakpoints.down("lg")]: { padding: "0.65rem 0", fontSize: "0.9rem" },
  [theme.breakpoints.down("md")]: { padding: "0.5rem 0", fontSize: "0.8rem" },
  [theme.breakpoints.down("sm")]: { padding: "0.4rem 0", fontSize: "0.6rem" },

  "&:hover": {
    color: "#FDA403",
    backgroundColor: "#fff",
    transition: "background-color 0.5s ease, color 0.5s ease",
  },
}));

export function SignupPage() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setIsLoading(true);

      // Check if all required fields are filled
      if (!email || !password || !confirmPassword || !selectedRole) {
        toast.error("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      // Check if password and confirmPassword are the same
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password do not match");
        setIsLoading(false);
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      const { data, error: updateError } = await supabase
        .from("doctorInfo")
        .insert({ email: email, role: selectedRole });

      if (signUpError || updateError) {
        toast.error(signUpError?.message || updateError?.message);
      } else {
        toast.success(
          "Sign up successful! Please check your email for confirmation."
        );
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSelectedRole("");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
  }, [user, selectedRole, password, email, navigate]);
  // useEffect(() => {
  //   const checkUserAndRedirect = async () => {
  //     const { data } = await supabase.auth.getUser();
  //     if (data.user && selectedRole) {
  //       if (selectedRole === "User") {
  //         navigate("/");
  //       } else if (selectedRole === "Doctor") {
  //         navigate("/profile");
  //       }
  //     }
  //   };

  //   checkUserAndRedirect();
  // }, [user, selectedRole, navigate]);

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
              <Heading>Sign Up</Heading>
            </Box>

            <TextFieldBox>
              <UserTextField
                required
                fullWidth
                id="email"
                label="you@example.com"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <PasswordTextField
                required
                fullWidth
                id="confirm-password"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </TextFieldBox>

            <Box
              sx={{
                width: "85%",
                display: "flex",
                justifyContent: "right",
                cursor: "pointer",
                marginTop: "0.25rem",
              }}
            >
              <TextTitle onClick={() => navigate("/login")}>
                Already have an account? Login
              </TextTitle>
            </Box>

            <Box
              sx={{
                width: "85%",
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                cursor: "pointer",
                marginTop: "0.25rem",
              }}
              gap={1}
            >
              <DoctorPatient>Are you a </DoctorPatient>

              <FormControlStyle required size="small">
                <InputLabel>choose</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  renderValue={(selected) => (
                    <Box
                      sx={{
                        fontSize: "0.8rem",
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "0.55rem",
                        },
                      }}
                    >
                      {selected}
                    </Box>
                  )}
                >
                  <MenuItemStyle value="patient">Patient</MenuItemStyle>
                  <MenuItemStyle value="doctor">Doctor</MenuItemStyle>
                </Select>
              </FormControlStyle>
            </Box>

            <ButtonBox>
              <CustomBtn
                type="submit"
                onClick={handleSignup}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign up"}
              </CustomBtn>
            </ButtonBox>
          </LoginContainer>
        </Container>
      </MainContainer>
    </>
  );
}
