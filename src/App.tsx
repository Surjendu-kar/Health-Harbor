import { useEffect } from "react";
import Details from "./pages/Details";
import DoctorSignup from "./pages/DoctorSignup";
import Home from "./pages/Home";
import { LoginWithGoogle } from "./pages/LoginWithGoogle";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./supabase/config";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";

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
        <Route element={<DoctorSignup />} path="/doctor" />
        <Route element={<Details />} path="/details" />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
