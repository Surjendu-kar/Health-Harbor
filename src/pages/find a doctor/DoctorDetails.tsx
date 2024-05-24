import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ViewDetails from "../../components/viewDetails/ViewDetails";
import { Box, Rating, Typography, styled, Button } from "@mui/material";
import { supabase } from "../../supabase/config";
import { User } from "@supabase/supabase-js";
import { ToastContainer, toast } from "react-toastify";
import FeedbackSection from "../../components/feedbackSection/FeedbackSection";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import PaymentModal from "../../components/stripeCheckout/PaymentModal";

const MainContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

const Container = styled(Box)(({ theme }) => ({
  width: "60%",
  [theme.breakpoints.down("lg")]: {
    width: "80%",
  },
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

const TopContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  margin: "2rem 0",
  gap: theme.spacing(1),
  [theme.breakpoints.down("lg")]: {
    margin: "1.5rem 0",
  },
  [theme.breakpoints.down("md")]: {
    margin: "1rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0.8rem 0",
  },
}));

const ImgContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  [theme.breakpoints.down("lg")]: {
    margin: "1.5rem 0",
  },
  [theme.breakpoints.down("md")]: {
    margin: "1rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0.8rem 0",
  },
}));

const Img = styled("img")(({ theme }) => ({
  height: "200px",
  width: "200px",
  borderRadius: "10px",

  [theme.breakpoints.down("lg")]: {
    height: "180px",
    width: "180px",
  },
  [theme.breakpoints.down("md")]: {
    height: "130px",
    width: "130px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "100px",
    width: "90px",
    borderRadius: "7px",
  },
}));

const NameRatingBox = styled(Box)(({ theme }) => ({
  marginLeft: "1rem",
  [theme.breakpoints.down("lg")]: {
    marginLeft: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: "0.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0.3rem",
  },
}));

const AddressContainer = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6rem",
  },
}));

const Specialization = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  padding: "0.5rem 0.8rem",
  borderRadius: "5px",
  backgroundColor: "#d1e2ff",
  textAlign: "center",
  marginBottom: "0.5rem",
  
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
    padding: "0.4rem 0.6rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.65rem",
    padding: "0.3rem 0.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.55rem",
    padding: "0.1rem 0.2rem",
    borderRadius: "3px",
  },
}));

const Name = styled(Typography)(({ theme }) => ({
  fontSize: "1.05rem",
  fontWeight: "bold",

  [theme.breakpoints.down("lg")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.55rem",
  },
}));

const ResponsiveRating = styled(Rating)(({ theme }) => ({
  fontSize: "0.9rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.85rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.5rem",
  },
}));

const Appointment = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  borderRadius: "7px",
  boxShadow: "1px 5px 8px rgba(0, 0, 0, 0.2)",

  [theme.breakpoints.down("lg")]: {
    padding: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0.75rem",
    borderRadius: "5px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0.45rem",
    borderRadius: "3px",
  },
}));

const TicketPriceContainer = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1rem",
  [theme.breakpoints.down("lg")]: {
    marginBottom: "0.75rem",
  },
  [theme.breakpoints.down("md")]: {
    marginBottom: "0.35rem",
  },
  [theme.breakpoints.down("sm")]: { marginBottom: "0.2rem" },
}));

const TimeSoltHeading = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "bold",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.5rem",
  },
}));
const TimeSoltContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(8),
  [theme.breakpoints.down("lg")]: {
    gap: theme.spacing(6),
  },
  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(5),
  },
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(3),
  },
}));

const Solts = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  padding: "0.2rem 0 0 0",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.47rem",
  },
}));

const DetailContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: "2.5rem 0 2rem 0",

  [theme.breakpoints.down("lg")]: {
    margin: "2rem 0 1.7rem 0",
  },
  [theme.breakpoints.down("md")]: {
    margin: "1.5rem 0 1.35rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "1rem 0",
  },
}));

const StyleText = styled(Typography)(({ theme, selected }) => ({
  fontSize: "17px",
  position: "relative",
  fontWeight: "bold",
  cursor: "pointer",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    height: "1px",
    width: "100%",
    transition: "all ease 0.3s",
    backgroundColor: selected ? "#000" : "#dadadab5",
  },

  "&:hover::after": {
    backgroundColor: "#000",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "17px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
  },
}));

const BookAppointmentBtn = styled(Button)(({ theme }) => ({
  marginTop: "2rem",
  fontSize: "0.8rem",
  color: "#fff",
  backgroundColor: "#1976d2",
  padding: "0.5rem 0",
  "&:hover": {
    color: "#1976d2",
    backgroundColor: "#fff",
  },

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.7rem",
    marginTop: "1.5rem",
    padding: "0.4rem 0",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.55rem",
    marginTop: "1rem",
    padding: "0.2rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.42rem",
    marginTop: "0.5rem",
    padding: "0.1rem 0",
    borderRadius: "2px",
  },
}));

function DoctorDetails() {
  const { state } = useLocation();
  const [showDetails, setShowDetails] = useState(true);
  const [value, setValue] = React.useState<number | null>(2);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Book Appointment");
  const [patientData, setPatientData] = useState(null);
  const navigate = useNavigate();
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: patientInfo, error } = await supabase
          .from("patientInfo")
          .select("*")
          .eq("email", user.email);

        if (error) {
          // console.error("Error fetching patient data:", error);
        } else {
          setPatientData(patientInfo[0]);
        }
      }

      const loadStripePromise = loadStripe(
        "pk_test_51PFVoxSIuGoHL7gaUvRh8gHcusZBk6N5b583P0Xrbzz3d1UNyZqZGQeSpluqWCS2z49M9SjhDpGINfHXPeUzaVAP00rCuqE7XU"
      );
      setStripePromise(loadStripePromise);
    };

    getUser();
  }, []);

  const isPatientDataComplete = (data) => {
    return (
      data?.name &&
      data.gender &&
      data.phoneNo &&
      data.height &&
      data.weight &&
      data.bloodGroup &&
      data.dateOfBirth &&
      data.about &&
      data.allergies &&
      data.address &&
      data.city &&
      data.emergencyContact
    );
  };

  const handleAboutClick = () => {
    setShowDetails(true);
  };

  const handleFeedbackClick = () => {
    setShowDetails(false);
  };

  const handleAppointmentClick = async () => {
    if (!user) {
      toast.error("Please login to book an appointment.");
      return;
    }

    if (user.email === state.doctor.email) {
      toast.error("You cannot book an appointment with yourself.");
      return;
    }

    if (
      patientData?.role === "patient" &&
      !isPatientDataComplete(patientData)
    ) {
      confirmAlert({
        title: "Incomplete Profile",
        message:
          "Your profile is incomplete. Would you like to navigate to the profile page to update your information?",
        buttons: [
          {
            label: "Yes",
            onClick: () => navigate("/profile"),
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });

      return;
    }

    setIsLoading(true);
    setButtonText("Loading...");

    // Check if the user is a patient or a doctor
    const { data: userData } = await supabase
      .from("patientInfo")
      .select("email")
      .eq("email", user.email)
      .single();

    if (userData) {
      setOpenPaymentModal(true);

      // await bookAppointment(user.email);
    } else {
      // Check if the user is a doctor
      const { data: doctorData, error: doctorError } = await supabase
        .from("doctorInfo")
        .select("email")
        .eq("email", user.email)
        .single();

      if (doctorError) {
        setIsLoading(false);
        setButtonText("Book Appointment");
        toast.error("Error occurred while checking user role.");
        return;
      }

      if (doctorData) {
        setIsLoading(false);
        setButtonText("Book Appointment");
        toast.error(
          "Doctors cannot book appointments. Please log in as a patient."
        );
        return;
      } else {
        setIsLoading(false);
        setButtonText("Book Appointment");
        toast.error("Invalid user. Please check your credentials.");
        return;
      }
    }
    setIsLoading(false);
    setButtonText("Book Appointment");
  };

  const handlePaymentSuccess = async () => {
    // Proceed with booking the appointment
    bookAppointment(user?.email);
  };

  const bookAppointment = async (userEmail: string) => {
    // Fetch existing appointments
    const { data: doctorData, error: doctorError } = await supabase
      .from("doctorInfo")
      .select("bookAppointment")
      .eq("id", state.doctor.id)
      .single();

    if (doctorError) {
      toast.error("Error occurred while fetching existing appointments.");
      return;
    }

    let existingAppointments = [];

    if (doctorData && doctorData.bookAppointment) {
      try {
        existingAppointments = JSON.parse(doctorData.bookAppointment);
      } catch (parseError) {
        console.error("Error parsing appointments data:", parseError);
        existingAppointments = [];
      }
    } else {
      existingAppointments = [];
    }

    // Remove existing appointments for the same user email to prevent duplicates
    existingAppointments = existingAppointments.filter(
      (appointment) => appointment?.patientDetails?.patientEmail !== userEmail
    );

    //fetch data from patientInfo for storing it into doctorInfo
    const { data: patientData, error: patientError } = await supabase
      .from("patientInfo")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (patientError) {
      toast.error("Error occurred while fetching patient information.");
      return;
    }

    const newAppointment = {
      patientDetails: {
        patientEmail: userEmail,
        patientId: patientData.id,
        patientName: patientData.name,
        patientGender: patientData.gender,
        patientPhone: patientData.phoneNo,
        patientHeight: patientData.height,
        patientWeight: patientData.weight,
        patientBloodGroup: patientData.bloodGroup,
        patientDateOfBirth: patientData.dateOfBirth,
        aboutProblem: patientData.about,
        allergies: patientData.allergies,
        address: patientData.address,
        city: patientData.city,
        emergency: JSON.parse(patientData.emergencyContact),
        // appointment_date: new Date().toISOString().split("T")[0],
        // appointment_time: new Date().toLocaleTimeString("en-US", {
        //   hour12: false,
        //   hour: "2-digit",
        //   minute: "2-digit",
        // }),
      },
    };

    const updatedAppointments = [...existingAppointments, newAppointment];

    try {
      const { data, error } = await supabase
        .from("doctorInfo")
        .update({ bookAppointment: updatedAppointments })
        .eq("id", state.doctor.id);

      if (error) throw error;

      // Update patientInfo table with doctor's email and appointment details
      await supabase
        .from("patientInfo")
        .update({
          appointment: [
            {
              doctorEmail: state.doctor.email,
              doctorName: state.doctor.name,
              appointmentDate: newAppointment.appointment_date,
              appointmentTime: newAppointment.appointment_time,
            },
          ],
        })
        .eq("email", userEmail);

      toast.success("Appointment booked successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error booking appointment.");
    }
  };

  let timeSoltsArray;
  if (state.doctor && typeof state.doctor.timeSlot === "string") {
    try {
      timeSoltsArray = JSON.parse(state.doctor.timeSlot);
    } catch (error) {
      console.error("Error parsing timeSolt", error);
      timeSoltsArray = [];
    }
  } else if (state.doctor && Array.isArray(state.doctor.timeSlot)) {
    timeSoltsArray = state.doctor.timeSlot;
  }

  const formatTime12Hour = (time24) => {
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "pm" : "am";
    let hour12 = hour % 12;
    if (hour12 === 0) hour12 = 12;
    const minuteFormatted = minutes === "00" ? "" : `:${minutes}`;
    return `${hour12}${minuteFormatted} ${ampm}`;
  };

  //fetch feedback
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const { data: doctorInfo, error } = await supabase
          .from("doctorInfo")
          .select("feedback")
          .eq("email", state.doctor.email)
          .single();

        if (error) {
          console.error("Error fetching doctor info:", error);
          toast.error("Failed to fetch doctor information.");
          return;
        }

        if (doctorInfo && doctorInfo.feedback) {
          const feedback = JSON.parse(doctorInfo.feedback);
          if (feedback.length > 0) {
            const totalRating = feedback.reduce(
              (acc, curr) => acc + curr.rating,
              0
            );
            const averageRating = totalRating / feedback.length;
            setValue(parseFloat(averageRating.toFixed(1)));
          } else {
            setValue(3);
          }
        } else {
          setValue(3);
        }
      } catch (error) {
        console.error("Error processing doctor info:", error);
        toast.error("Error processing feedback data.");
        setValue(3);
      }
    };

    fetchDoctorInfo();
  }, [state.doctor.email]);

  return (
    <>
      <ToastContainer />

      <MainContainer>
        <Container>
          <TopContainer>
            <ImgContainer>
              <Img src={state.doctor.img} />
              <NameRatingBox>
                <Specialization>
                  {state.doctor.specialization.charAt(0).toUpperCase() +
                    state.doctor.specialization.slice(1)}
                </Specialization>
                <Name>{state.doctor.name}</Name>
                <ResponsiveRating
                  name="read-only"
                  value={value}
                  readOnly
                  precision={0.5}
                />
                <AddressContainer>
                  {state.doctor.address}, {state.doctor.city}
                </AddressContainer>
              </NameRatingBox>
            </ImgContainer>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Appointment>
                <TicketPriceContainer>
                  <Solts sx={{ padding: "0" }}>Clinic price: </Solts>
                  <Solts
                    sx={{
                      padding: "0",
                      fontWeight: "bold",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {state.doctor.price}
                  </Solts>
                </TicketPriceContainer>

                <TimeSoltHeading>Available TimeSolts: </TimeSoltHeading>

                <TimeSoltContainer>
                  <Box>
                    {timeSoltsArray &&
                      timeSoltsArray.map((each) => {
                        return (
                          <Solts>
                            {each.day.charAt(0).toUpperCase() +
                              each.day.slice(1)}
                            :
                          </Solts>
                        );
                      })}
                  </Box>
                  <Box>
                    {timeSoltsArray &&
                      timeSoltsArray.map((each) => {
                        return (
                          <Solts>
                            {formatTime12Hour(each.startTime)} -{" "}
                            {formatTime12Hour(each.endTime)}
                          </Solts>
                        );
                      })}
                  </Box>
                </TimeSoltContainer>

                <BookAppointmentBtn
                  variant="outlined"
                  onClick={handleAppointmentClick}
                  disabled={isLoading}
                >
                  {buttonText}
                </BookAppointmentBtn>
              </Appointment>
            </Box>
          </TopContainer>

          <DetailContainer sx={{ gap: 2 }}>
            <StyleText onClick={handleAboutClick} selected={showDetails}>
              About
            </StyleText>
            <StyleText onClick={handleFeedbackClick} selected={!showDetails}>
              Feedback
            </StyleText>
          </DetailContainer>
          {showDetails ? (
            <ViewDetails fetchedData={state.doctor} />
          ) : (
            <FeedbackSection fetchedData={state.doctor} />
          )}
        </Container>
      </MainContainer>

      {stripePromise && (
        <Elements stripe={stripePromise}>
          <PaymentModal
            open={openPaymentModal}
            onClose={() => setOpenPaymentModal(false)}
            onPaymentSuccess={handlePaymentSuccess}
            price={state.doctor.price}
          >
            <ElementsConsumer>
              {({ elements, stripe }) => (
                <ModernPaymentForm
                  elements={elements}
                  stripe={stripe}
                  onPaymentSuccess={handlePaymentSuccess}
                  onClose={() => setOpenPaymentModal(false)}
                  price={state.doctor.price}
                />
              )}
            </ElementsConsumer>
          </PaymentModal>
        </Elements>
      )}
    </>
  );
}

export default DoctorDetails;
