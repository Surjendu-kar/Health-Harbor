import { useEffect } from "react";
import ProfileDetails from "./pages/profile/ProfileDetails";
import Home from "./pages/homePage/Home";
import { LoginPage } from "./pages/loginSignupPage/LoginPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./supabase/config";
import FindDoctor from "./pages/find a doctor/FindDoctor";
import Service from "./pages/servicePage/Service";
import AboutUs from "./pages/aboutUsPage/AboutUs";
import Contact from "./pages/contactPage/Contact";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import DoctorDetails from "./pages/find a doctor/DoctorDetails";
import { SignupPage } from "./pages/loginSignupPage/SignupPage";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import FeedbackSection from "./components/feedbackSection/FeedbackSection";
import ResetPassword from "./pages/loginSignupPage/ResetPassword";
import { Box } from "@mui/material";

const AppContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const ContentContainer = styled(Box)({
  flex: 1,
});

const theme = createTheme();

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // console.log(event, session);
      if (event === "INITIAL_SESSION") {
        // handle initial session
      } else if (event === "SIGNED_IN") {
        // handle sign in event
        // navigate('/login');
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });

    return () => {
      // call unsubscribe to remove the callback
      // subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Navbar />
        <ContentContainer>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<SignupPage />} path="/signup" />
            <Route element={<FindDoctor />} path="/find-a-doctor" />
            <Route element={<DoctorDetails />} path="/doctor-details" />
            <Route element={<FeedbackSection />} path="/feedback" />
            <Route element={<Service />} path="/service" />
            <Route element={<AboutUs />} path="/about-us" />
            <Route element={<Contact />} path="/contact" />
            <Route element={<ProfileDetails />} path="/profile" />
            <Route element={<ResetPassword />} path="/reset" />
          </Routes>
        </ContentContainer>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
