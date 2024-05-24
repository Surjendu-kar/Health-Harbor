import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/config";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  styled,
  Button,
  Container,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

const TitleTextField = styled(TextField)(({ theme }) => ({
  marginTop: "1.5rem",
  display: "block",
  backgroundColor: "#fff",

  [theme.breakpoints.down("lg")]: {
    marginTop: "1rem",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0.7rem",
  },

  "& .MuiInputBase-root": {
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.95rem",
      padding: "0px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.75rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.65rem",
    },
  },
  "& .MuiOutlinedInput-input": {
    [theme.breakpoints.down("lg")]: {
      height: "20px",
    },
    [theme.breakpoints.down("md")]: {
      height: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "5px",
      padding: "15px",
    },
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  marginBottom: "0.5rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "2.0rem",
    marginBottom: "0.3rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
    marginBottom: "0.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.0rem",
    marginBottom: "0.1rem",
  },
}));

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async () => {
      const session = await supabase.auth.getSession();
      if (session?.data?.session?.access_token) {
        setAccessToken(session.data.session.access_token);
      }
    };

    getAccessToken();
  }, []);

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password reset successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error("An error occurred while resetting the password");
      console.error("Password reset error:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Heading variant="h4" gutterBottom>
          Reset Password
        </Heading>
        <TitleTextField
          label="Access Token"
          value={accessToken}
          margin="normal"
          fullWidth
          disabled
        />
        <TitleTextField
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TitleTextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePasswordReset}
          sx={{ marginTop: 2 }}
        >
          Reset Password
        </Button>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default ResetPassword;
