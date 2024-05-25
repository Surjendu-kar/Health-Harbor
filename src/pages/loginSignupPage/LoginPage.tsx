import { useEffect, useState } from "react";
import { supabase } from "../../supabase/config";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  styled,
  Button,
  Modal,
  IconButton,
  InputAdornment,
} from "@mui/material";
import loginImg from "../../assets/loginImg/portrait-doctor.jpg";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#d3d3d378",
  color: "#000",

  [theme.breakpoints.down("md")]: { padding: "0.8rem" },
  [theme.breakpoints.down("sm")]: { padding: "0rem" },
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

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  [theme.breakpoints.down("lg")]: { fontSize: "1rem" },
  [theme.breakpoints.down("md")]: { fontSize: "0.8rem" },
  [theme.breakpoints.down("sm")]: { fontSize: "0.6rem" },
}));

const TextTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  [theme.breakpoints.down("lg")]: { fontSize: "0.75rem" },
  [theme.breakpoints.down("md")]: { fontSize: "0.6rem" },
  [theme.breakpoints.down("sm")]: { fontSize: "0.45rem" },
}));
const TextFieldBox = styled(Box)(({ theme }) => ({
  margin: "2rem 0 0",
  width: "90%",
  [theme.breakpoints.down("md")]: { margin: "1.5rem 0 0" },
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

const PasswordTextField = styled(UserTextField)(({ theme }) => ({
  marginTop: "0.8rem",
  [theme.breakpoints.down("md")]: { marginTop: "0.5rem" },
  [theme.breakpoints.down("sm")]: { marginTop: "0.3rem" },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "transparent",
    },
  },
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

const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  padding: "2rem",
  outline: "none",
  maxWidth: "400px",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: "1rem",
    maxWidth: "300px",
  },
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1.5rem",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "1rem",
  },
}));

const ModalTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [theme.breakpoints.down("sm")]: {
    padding: "4px",
  },
}));

export function LoginPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    try {
      setIsResetLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset`,
      });

      if (error) {
        throw error;
      }

      toast.success("Password reset email sent. Please check your inbox.");
      setOpenModal(false);
      setResetEmail("");
    } catch (error) {
      toast.error("Error sending password reset email.");
      console.error("Error sending password reset email:", error);
    } finally {
      setIsResetLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      if (!email || !password) {
        toast.error("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        toast.error(error.message);
      } else if (data.length === 0) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successful.");
        setTimeout(() => {
          navigate("/");
        }, 1000);
        setEmail("");
        setPassword("");
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

  return (
    <>
      <ToastContainer />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Reset Password</ModalTitle>
            <CloseButton onClick={() => setOpenModal(false)}>
              <CloseIcon />
            </CloseButton>
          </ModalHeader>
          <TextField
            label="Email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePasswordReset}
            fullWidth
            sx={{ marginTop: "1rem" }}
          >
            {isResetLoading ? "Loading..." : "Send Reset Link"}
          </Button>
        </ModalContainer>
      </Modal>

      <MainContainer>
        <Container>
          <ImgContainer>
            <DoctorImg src={loginImg} alt="" />
          </ImgContainer>

          <LoginContainer>
            <Box textAlign={"center"}>
              <Heading>Hey Welcome!</Heading>
              <Title>Login Your Account</Title>
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
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </TextFieldBox>

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
              <TextTitle onClick={() => setOpenModal(true)}>
                Forgot password?
              </TextTitle>
            </Box>

            <ButtonBox>
              <CustomBtn
                type="submit"
                onClick={() => {
                  handleLogin();
                }}
              >
                {isLoading ? "Loading..." : "Login"}
              </CustomBtn>
            </ButtonBox>
          </LoginContainer>
        </Container>
      </MainContainer>
    </>
  );
}
