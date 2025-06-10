import { useEffect, useState } from "react";

import { Box, styled, keyframes } from "@mui/material";
import Sidebar from "./sidebar/Sidebar";
import Info from "./doctorDetails/profileInfo/Info";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../supabase/config";
import DoctorOverView from "./doctorDetails/doctorOverView/DoctorOverView";
import Appointments from "./doctorDetails/appointments/Appointments";
import LoadingAnimation from "../../components/lottieAnimation/LoadingAnimation";
import FetchSpecificDoctor from "../../supabase/FetchSpecificDoctor";
import PatientInfo from "./patientDetails/patientInfo/PatientInfo";
import PatientAppointment from "./patientDetails/patientAppointment/PatientAppointment";

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
  role: string;
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
        try {
          const { data, error } = await FetchSpecificDoctor({
            userEmail: user.email,
          });
          setIsLoading(false);
          if (!error && data && data.length > 0) {
            setFetchedData(data[0]);
          } else {
            // If no doctor data found, try to fetch from patientInfo
            const { data: patientData, error: patientError } = await supabase
              .from("patientInfo")
              .select("*")
              .eq("email", user.email)
              .single();
            
            if (!patientError && patientData) {
              setFetchedData(patientData);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [user?.email, fetchedData]);

  const handleMenuSelect = (component: string) => {
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
      {activeComponent === "overview" && fetchedData?.role === "doctor" ? (
        <DoctorOverView user={user} fetchedData={fetchedData} />
      ) : activeComponent === "overview" && fetchedData?.role === "patient" ? (
        <PatientAppointment user={user} />
      ) : activeComponent === "profile" && fetchedData?.role === "doctor" ? (
        <Info user={user} fetchedData={fetchedData} />
      ) : activeComponent === "profile" && fetchedData?.role === "patient" ? (
        <PatientInfo user={user} />
      ) : activeComponent === "appointments" && fetchedData?.role === "doctor" ? (
        <Appointments user={user} fetchedData={fetchedData} />
      ) : null}
    </MainContainer>
  );
}

export default ProfileDetails;
