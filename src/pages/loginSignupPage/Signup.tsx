import React from "react";
import { ToastContainer, toast } from "react-toastify";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import loginimg from "../../assets/loginImg/portrait-doctor.jpg";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import { forwardRef } from "react";
// import Snackbar from "@mui/material/Snackbar";
// import Stack from "@mui/material/Stack";
// import MuiAlert from "@mui/material/Alert";
// import Slide from "@mui/material/Slide";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { supabase } from "../../supabase/config";
// import { User } from "@supabase/supabase-js";

// // function LoginWithGoogle() {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [selectedRole, setSelectedRole] = useState<string>("");

// //   const navigate = useNavigate();

// //   const handleLoginWithGoogle = async () => {
// //     try {
// //       const { error } = await supabase.auth.signInWithOAuth({
// //         provider: "google",
// //         options: {
// //           queryParams: {
// //             access_type: "offline",
// //             prompt: "consent",
// //           },
// //         },
// //       });

// //       if (error) {
// //         throw new Error(error.message);
// //       }
// //     } catch (error) {
// //       alert(error);
// //     }
// //   };

// //   const handleLogout = async () => {
// //     await supabase.auth.signOut();
// //     setUser(null);
// //   };

// //   useEffect(() => {
// //     const getUser = async () => {
// //       const {
// //         data: { user },
// //       } = await supabase.auth.getUser();
// //       setUser(user);
// //     };

// //     getUser();
// //   }, []);

// //   useEffect(() => {
// //     // Redirect only after user is logged in and a role is selected
// //     if (user && selectedRole) {
// //       if (selectedRole === "User") {
// //         navigate("/");
// //       } else if (selectedRole === "Doctor") {
// //         navigate("/profile");
// //       }
// //     }
// //   }, [user, selectedRole, navigate]);

// //   const handleRoleSelection = (role: string) => {
// //     console.log(`User selected role: ${role}`);
// //     setSelectedRole(role);
// //   };
// // }
// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

// const boxstyle = {
//   position: "absolute",
//   top: "54%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "80%",
//   bgcolor: "background.paper",
//   height: "85%",
//   boxShadow: "24",
// };

// const center = {
//   position: "relative",
//   top: "50%",
//   left: "37%",
// };

export default function Signup() {
  // const [remember, setRemember] = useState(false);
  // const navigate = useNavigate();
  return (
    <>
      <ToastContainer />
      <button onClick={() => toast.warning(" currently in development phase.")}>
        signup
      </button>
      {/* <div
        style={{
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "111%",
                  objectFit: "contain",
                  color: "#f5f5f5",
                  backgroundImage: `url(${loginimg})`,
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "111%",
                  minHeight: "500px",
                  backgroundColor: "#954D91",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={35} />
                    <Box sx={center}>
                      <Avatar
                        sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                        Sign Up
                      </Typography>
                    </Box>
                    <br />
                    <Grid container spacing={1}>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="username"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="password"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="confirm password"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <Stack
                          direction="row"
                          className="mb-5 items-center justify-between"
                          spacing={2}
                        >
                          {/* <FormControlLabel */}
      {/* sx={{width: "60%"}}
                                            onClick={() => setRemember(!remember)}
                                            control={<Checkbox checked={remember} />}
                                            label="Remember me"
                                        /> */}
      {/* <label
                            className="font-bold tect-[16px] leading-7"
                            style={{ marginTop: "10px" }}
                          >
                            Are you a:
                            <select
                              name="role"
                              className="font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                            >
                              <option value="patient">Patient</option>
                              <option value="doctor">Doctor</option>
                            </select>
                          </label> */}
      {/* <Typography
                                            variant="body1"
                                            component="span"
                                            onClick={() => {
                                                navigate("/reset-password");
                                            }}
                                            style={{marginTop:"10px", cursor:"pointer"}}
                                            >
                                                Forgot Password?
                                            </Typography> */}
      {/* </Stack>
                        <br />
                        <br />
                      </Grid>
                      <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth="true"
                          size="large"
                          // onClick={LoginWithGoogle}
                          sx={{
                            mt: "10px",
                            mr: "20px",
                            borderRadius: 28,
                            color: "#ffffff",
                            minWidth: "170px",
                            backgroundColor: "#FF9A01",
                          }}
                        >
                          Sign Up
                        </Button>
                      </Grid>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <Stack direction="row" spacing={2}>
                          <Typography
                            variant="body1"
                            component="span"
                            style={{ marginTop: "10px", marginLeft: "12vh" }}
                          >
                            Already have an account?{" "}
                            <span
                              style={{ color: "#ebe4fb", cursor: "pointer" }}
                              onClick={() => {
                                navigate("/login");
                              }}
                            >
                              Login
                            </span>
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div> */}
    </>
  );
}
