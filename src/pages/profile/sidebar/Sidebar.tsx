import { Box, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/config";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const MainContainer = styled(Box)(({ theme }) => ({
  margin: "2rem 5rem",
  padding: "2rem",
  height: "30%",
  borderRadius: "10px",
  backgroundColor: "white",
  textAlign: "center",
  boxShadow: "1px 4px 8px rgba(0, 0, 0, 0.1)",

  [theme.breakpoints.down("lg")]: {
    margin: "0rem 3rem",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0rem 2.5rem",
    padding: "1.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0rem 1rem",
    padding: "0.75rem",
  },
}));
const FirstContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));
const SecondContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "2rem",
  [theme.breakpoints.down("lg")]: {
    marginTop: "1.5rem",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0.5rem",
  },
}));

const TextStyle = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  padding: "1rem 4rem",
  fontSize: "1rem",
  borderRadius: "5px",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#4e5d8e",
    color: "#fff",
  },

  [theme.breakpoints.down("lg")]: {
    padding: "0.8rem 3rem",
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0.6rem 2rem",
    fontSize: "0.75rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0.3rem 1.05rem",
    fontSize: "0.5rem",
  },
}));
const LogOut = styled(TextStyle)(() => ({
  backgroundColor: "#000",
  color: "#fff",
  fontSize: "1rem",

  "&:hover": {
    backgroundColor: "#fff",
    color: "#000",
  },
}));

const DeleteAc = styled(TextStyle)(({ theme }) => ({
  backgroundColor: "red",
  fontSize: "1rem",
  color: "#fff",
  marginTop: "0.5rem",

  "&:hover": {
    backgroundColor: "#fff",
    color: "#000",
  },

  [theme.breakpoints.down("lg")]: {
    marginTop: "0.4rem",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "0.3rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0.2rem",
  },
}));

function Sidebar({ onMenuSelect }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    // console.log(user);

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };
  const handleDeleteAc = async () => {
    try {
      const { error } = await supabase
        .from("doctorInfo")
        .delete()
        .eq("email", user?.email);

      if (error) {
        console.error("Error deleting account:", error.message);
      } else {
        toast.success("Account deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <MainContainer>
        <FirstContainer>
          <TextStyle onClick={() => onMenuSelect("overview")}>
            Overview
          </TextStyle>
          <TextStyle onClick={() => onMenuSelect("appointments")}>
            Appointments
          </TextStyle>
          <TextStyle onClick={() => onMenuSelect("profile")}>Profile</TextStyle>
        </FirstContainer>
        {user && (
          <SecondContainer>
            <LogOut onClick={handleLogout}>Logout</LogOut>
            <DeleteAc onClick={handleDeleteAc}>Delete Account</DeleteAc>
          </SecondContainer>
        )}
      </MainContainer>
    </>
  );
}

export default Sidebar;
