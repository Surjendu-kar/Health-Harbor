import { Box, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/config";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const MainContainer = styled(Box)(() => ({
  margin: "2rem 5rem",
  padding: "2rem",
  height: "20rem",
  borderRadius: "10px",
  backgroundColor: "white",
  textAlign: "center",
  boxShadow: "1px 4px 8px rgba(0, 0, 0, 0.1)",
}));

const TextStyle = styled(Typography)(() => ({
  cursor: "pointer",
  padding: "1rem 4rem",
  borderRadius: "5px",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#8793ff",
    color: "#fff",
  },
}));
const LogOut = styled(TextStyle)(() => ({
  backgroundColor: "#000",
  color: "#fff",

  "&:hover": {
    backgroundColor: "#fff",
    color: "#000",
  },
}));

const DeleteAc = styled(TextStyle)(() => ({
  backgroundColor: "red",
  color: "#fff",
  marginTop: "0.5rem",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#000",
  },
}));

function Sidebar() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("./login");
  };

  return (
    <MainContainer>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextStyle>Overview</TextStyle>
        <TextStyle>Appointments</TextStyle>
        <TextStyle>Profile</TextStyle>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", mt: "2rem" }}>
        {user && <LogOut onClick={handleLogout}>Logout</LogOut>}
        <DeleteAc>Delete Account</DeleteAc>
      </Box>
    </MainContainer>
  );
}

export default Sidebar;
