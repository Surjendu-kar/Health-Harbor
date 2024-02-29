import { useEffect } from "react";
import ProfileDetails from "./pages/profile/ProfileDetails";
import Home from "./pages/homePage/Home";
import { LoginWithGoogle } from "./pages/loginSignupPage/LoginWithGoogle";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./supabase/config";
import FindDoctor from "./pages/find a doctor/FindDoctor";
import Service from "./pages/servicePage/Service";
import AboutUs from "./pages/aboutUsPage/AboutUs";
import Contact from "./pages/contactPage/Contact";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import Signup from "./pages/loginSignupPage/Signup";

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
        <Route element={<LoginWithGoogle />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<FindDoctor />} path="/find-a-doctor" />
        <Route element={<Service />} path="/service" />
        <Route element={<AboutUs />} path="/about-us" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<ProfileDetails />} path="/profile" />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
