import { useEffect, useState } from "react";

import { Box, styled, keyframes } from "@mui/material";
import Sidebar from "./sidebar/Sidebar";
import Info from "./profileInfo/Info";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../supabase/config";
import OverView from "./overview/OverView";
import Appointments from "./appointments/Appointments";
import LoadingAnimation from "../../components/lottieAnimation/LoadingAnimation";
import FetchSpecificDoctor from "../../supabase/FetchSpecificDoctor";

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
    marginTop: "0.75rem",
  },
}));

type DoctorInfo = {
  id: number;
  name: string;
  email: string;
  phoneno: string;
  gender: string;
  specialization: string;
  price: number;
  address: string;
  city: string;
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
        const { data, error } = await FetchSpecificDoctor({
          userEmail: user.email,
        });
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
      {activeComponent === "overview" && fetchedData?.role === "doctor" && (
        <OverView user={user} fetchedData={fetchedData} />
      )}
      {activeComponent === "overview" && fetchedData?.role === "patient" && (
        <>
          patient overview -- <b>currently in development phase.</b>
        </>
      )}

      {activeComponent === "profile" && fetchedData?.role === "doctor" && (
        <Info user={user} fetchedData={fetchedData} />
      )}
      {activeComponent === "profile" && fetchedData?.role === "patient" && (
        <>
          patient profile -- <b>currently in development phase.</b>
        </>
      )}

      {activeComponent === "appointments" && fetchedData?.role === "doctor" && (
        <Appointments user={user} />
      )}
      {activeComponent === "appointments" &&
        fetchedData?.role === "patient" && (
          <>
            patient appointments -- <b>currently in development phase.</b>
          </>
        )}
    </MainContainer>
  );
}

export default ProfileDetails;
