import { useEffect, useState } from "react";

import { Box, styled } from "@mui/material";

import Sidebar from "./sidebar/Sidebar";
import Info from "./profileInfo/Info";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../supabase/config";
import OverView from "./overview/OverView";
import Appointments from "./appointments/Appointments";
import FetchData from "../../supabase/FetchData";

const MainContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "2rem",
}));

type DoctorInfo = {
  id: number;
  name: string;
  email: string;
  phoneNo: string;
  bio: string;
  gender: string;
  specialization: string;
  price: number;
  qualifications: string[];
  experiences: string[];
  timeSlot: string[];
  about: string;
};

function ProfileDetails() {
  const [user, setUser] = useState<User | null>(null);
  const [activeComponent, setActiveComponent] = useState("overview");
  const [fetchedData, setFetchedData] = useState<DoctorInfo | null>(null);

  useEffect(() => {
    // fetch user login info
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  useEffect(() => {
    //fetch from supabase
    if (!fetchedData && user?.email) {
      const fetchData = async () => {
        const { data, error } = await FetchData({ userEmail: user.email });
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setFetchedData(data[0]);
        }
      };

      fetchData();
    }
  }, [user?.email, fetchedData]);

  const handleMenuSelect = (component) => {
    setActiveComponent(component);
  };

  return (
    <MainContainer>
      <Sidebar onMenuSelect={handleMenuSelect} />
      {activeComponent === "overview" && (
        <OverView user={user} fetchedData={fetchedData} />
      )}
      {activeComponent === "profile" && (
        <Info user={user} fetchedData={fetchedData} />
      )}
      {activeComponent === "appointments" && <Appointments user={user} />}
    </MainContainer>
  );
}

export default ProfileDetails;
