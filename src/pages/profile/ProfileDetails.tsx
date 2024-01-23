import { useEffect, useState } from "react";

import { Box, styled } from "@mui/material";

import Sidebar from "./sidebar/Sidebar";
import Info from "./profileInfo/Info";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../supabase/config";
import OverView from "./overview/OverView";
import Appointments from "./appointments/Appointments";

const MainContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "2rem",
}));

function ProfileDetails() {
  const [user, setUser] = useState<User | null>(null);
  const [activeComponent, setActiveComponent] = useState("overview");
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  const handleMenuSelect = (component) => {
    setActiveComponent(component);
  };

  return (
    <MainContainer>
      <Sidebar onMenuSelect={handleMenuSelect} />
      {activeComponent === "overview" && <OverView />}
      {activeComponent === "profile" && <Info />}
      {activeComponent === "appointments" && <Appointments />}
    </MainContainer>
  );
}

export default ProfileDetails;
