import { useEffect, useState } from "react";

import { Box, styled, keyframes } from "@mui/material";
import Sidebar from "./sidebar/Sidebar";
import Info from "./profileInfo/Info";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../supabase/config";
import OverView from "./overview/OverView";
import Appointments from "./appointments/Appointments";
import FetchData from "../../supabase/FetchData";
import LoadingAnimation from "../../components/lottieAnimation/LoadingAnimation";

const MainContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "2rem",
  [theme.breakpoints.down("lg")]: {
    marginTop: "1.7rem",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0.5rem",
  },
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
const blurOut = keyframes`
  from {
    filter: blur(6px);
    opacity: 0;
  }
  to {
    filter: blur(0);
    opacity: 1;
  }
`;

function ProfileDetails() {
  const [user, setUser] = useState<User | null>(null);
  const [activeComponent, setActiveComponent] = useState("overview");
  const [fetchedData, setFetchedData] = useState<DoctorInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    if (!fetchedData && user?.email) {
      const fetchData = async () => {
        const { data, error } = await FetchData({ userEmail: user.email });
        setIsLoading(false);
        if (!error) {
          setFetchedData(data[0]);
        }
      };

      fetchData();
    }
  }, [user?.email, fetchedData]);

  const handleMenuSelect = (component) => {
    setActiveComponent(component);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
        }}
      >
        <LoadingAnimation />
      </Box>
    );
  }

  return (
    <MainContainer
      sx={{
        animation: !isLoading ? `${blurOut} 0.4s ease-out forwards` : "none",
      }}
    >
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
