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
import ResetPassword from "./pages/loginSignupPage/ResetPassword";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

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
      // subscription.uns
    };
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignupPage />} path="/signup" />
        <Route element={<FindDoctor />} path="/find-a-doctor" />
        <Route element={<DoctorDetails />} path="/doctor-details" />
        <Route element={<Service />} path="/service" />
        <Route element={<AboutUs />} path="/about-us" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<ProfileDetails />} path="/profile" />
        <Route element={<ResetPassword />} path="/reset" />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
