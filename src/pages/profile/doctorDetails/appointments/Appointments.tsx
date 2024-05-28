import { Box, Button, TextField, styled } from "@mui/material";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { supabase } from "../../../../supabase/config";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const MainContainer = styled(Box)(() => ({
  width: "65%",
  margin: "2rem 0",
}));

const TableContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const Row = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-around",
  padding: "0.5rem 0.2rem",
  width: "100%",
}));

const CellHeading = styled(Box)(({ theme }) => ({
  flex: 1,
  textAlign: "center",
  fontSize: "16px",
  fontWeight: "bold",
  letterSpacing: "0.5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5rem",
}));

const Cell = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  fontSize: "13px",
  letterSpacing: "0.5px",
  borderRight: "1px solid black",
  padding: "1rem 0.25rem",
  wordBreak: "break-word",
}));

const FlexCell = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  width: "100%",
}));
const SetAppointmentCell = styled(Cell)(({ theme }) => ({
  display: "flex",
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  padding: theme.spacing(1),
  borderRight: "none",
}));

const DateTextField = styled(TextField)(({ theme }) => ({
  // width: "100px",
}));

const TimeTextField = styled(TextField)(({ theme }) => ({
  // width: "100px",
}));

const AppointmentButton = styled(Button)(({ theme }) => ({
  width: "100px",
  fontSize: "0.7rem",
}));

function formatTime(time) {
  const [hours, minutes] = time.split(":");
  let amPm = "AM";
  let formattedHours = parseInt(hours, 10);

  if (formattedHours === 0) {
    formattedHours = 12;
  } else if (formattedHours === 12) {
    amPm = "PM";
  } else if (formattedHours > 12) {
    formattedHours -= 12;
    amPm = "PM";
  }

  return `${formattedHours}:${minutes} ${amPm}`;
}

function Appointments({ user, fetchedData }: { user: User; fetchedData }) {
  const [appointments, setAppointments] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [appointmentTime, setAppointmentTime] = useState<string>(""); 

  useEffect(() => {
    if (fetchedData && fetchedData.bookAppointment) {
      const parsedAppointments = JSON.parse(fetchedData.bookAppointment);
      setAppointments(parsedAppointments);
    }
  }, [fetchedData]);

  const handleAppointmentDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAppointmentDate(event.target.value);
  };

  const handleAppointmentTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAppointmentTime(event.target.value);
  };

  const updateAppointmentsState = (updatedAppointmentData) => {
    setAppointments(updatedAppointmentData);
  };

  const handleSetAppointment = async (index) => {
    if (!appointmentDate || !appointmentTime) {
      toast.error("Please select a date and time for the appointment.");
      return;
    }
    //update process for appointment date & time in doctor table
    const { data: doctorData, error } = await supabase
      .from("doctorInfo")
      .select("bookAppointment")
      .eq("email", user.email);

    if (error) {
      console.error("Error retrieving doctor data:", error);
      return;
    }

    const appointmentData = JSON.parse(doctorData[0].bookAppointment);
    const patientId = appointments[index]?.patientDetails?.patientId;
    console.log(appointmentData);
    console.log(patientId);

    const updatedAppointmentData = appointmentData.map((appointment) => {
      if (appointment?.patientDetails?.patientId === patientId) {
        return {
          ...appointment,
          appointmentDate,
          appointmentTime,
        };
      }
      return appointment;
    });

    const updatedAppointmentDataJson = JSON.stringify(updatedAppointmentData);

    const { error: updateError } = await supabase
      .from("doctorInfo")
      .update({ bookAppointment: updatedAppointmentDataJson })
      .eq("email", user.email);

    if (updateError) {
      console.error("Error updating doctor data:", updateError);
      return;
    }

    //update process for appointment date & time in patient table

    const { data: patientData, error: patientDataError } = await supabase
      .from("patientInfo")
      .select("appointment")
      .eq("id", patientId);

    if (patientDataError) {
      console.error("Error retrieving patient data:", patientDataError);
      return;
    }

    const existingAppointments = patientData[0]?.appointment
      ? JSON.parse(patientData[0].appointment)
      : [];

    const updatedAppointments = existingAppointments.map((appointment) => ({
      ...appointment,
      appointmentDate,
      appointmentTime,
    }));

    console.log("updatedAppointments", updatedAppointments);

    const { error: patientUpdateError } = await supabase
      .from("patientInfo")
      .update({ appointment: JSON.stringify(updatedAppointments) })
      .eq("id", patientId);

    if (!patientUpdateError) {
      // Update the appointments state with the updated data
      updateAppointmentsState(updatedAppointmentData);
      toast.success("Appointment date and time set successfully.");
    } else {
      console.error("Error updating patient data:", patientUpdateError);
    }
  };

  if (appointments.length === 0) {
    return (
      <MainContainer>
        <TableContainer>
          <Row>
            <Cell>No appointments found.</Cell>
          </Row>
        </TableContainer>
      </MainContainer>
    );
  }

  return (
    <>
      <ToastContainer />

      <MainContainer>
        <TableContainer>
          <Row
            sx={{
              backgroundColor: "#c3c9fa59",
              borderTopRightRadius: "10px",
              borderTopLeftRadius: "10px",
            }}
          >
            <CellHeading>Patient Details</CellHeading>
            <CellHeading>About problem</CellHeading>
            <CellHeading>EmergencyContact</CellHeading>
            <CellHeading>Payement</CellHeading>
            <CellHeading sx={{ flex: 1 }}>Appointment Date & Time</CellHeading>
          </Row>
          {appointments &&
            appointments.map((appointment, index) => (
              <Row
                key={index}
                sx={{
                  border: "1px solid black",
                  padding: "0px",
                  display: "flex",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <Cell>
                  Email: {appointment?.patientDetails?.patientEmail}
                  <br />
                  Name: {appointment?.patientDetails?.patientName}
                  <br />
                  Gender: {appointment?.patientDetails?.patientGender}
                  <br />
                  Phone No: {appointment?.patientDetails?.patientPhone}
                  <br />
                  Height: {appointment?.patientDetails?.patientHeight} <br />
                  Weight: {appointment?.patientDetails?.patientWeight} <br />
                  Blood Group: {appointment?.patientDetails?.patientBloodGroup}
                  <br />
                  Date Of Birth:{" "}
                  {appointment?.patientDetails?.patientDateOfBirth?.slice(
                    0,
                    10
                  )}
                  <br />
                  Address: {appointment?.patientDetails?.address}
                  <br />
                  City: {appointment?.patientDetails?.city}
                </Cell>

                <Cell>
                  About Problem: {appointment?.patientDetails?.aboutProblem}
                  <br />
                  Allergies: {appointment?.patientDetails?.allergies}
                </Cell>

                <Cell>
                  Name: {appointment?.patientDetails?.emergency?.name}
                  <br />
                  Relation:{" "}
                  {appointment?.patientDetails?.emergency?.relationship}
                  <br />
                  Phone No: {appointment?.patientDetails?.emergency?.phone}
                  <br />
                  {appointment?.emergency?.email && (
                    <>
                      Email: {appointment?.patientDetails?.emergency?.email}{" "}
                      <br />
                    </>
                  )}
                </Cell>

                <Cell
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {appointment?.patientDetails?.payment ? (
                    <CheckIcon color="success" />
                  ) : (
                    <CloseIcon color="error" />
                  )}
                </Cell>

                <SetAppointmentCell>
                  {appointment?.appointmentDate &&
                  appointment?.appointmentTime ? (
                    <>
                      {appointment?.appointmentDate
                        .split("-")
                        .reverse()
                        .join("-")}{" "}
                      - {formatTime(appointment?.appointmentTime)}
                    </>
                  ) : (
                    <>
                      <FlexCell>
                        <DateTextField
                          type="date"
                          value={appointmentDate}
                          onChange={handleAppointmentDateChange}
                          label="Date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                        />
                        <TimeTextField
                          type="time"
                          value={appointmentTime}
                          onChange={handleAppointmentTimeChange}
                          label="Time"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                        />
                        <AppointmentButton
                          variant="contained"
                          onClick={() => handleSetAppointment(index)}
                        >
                          Set
                        </AppointmentButton>
                      </FlexCell>
                    </>
                  )}
                </SetAppointmentCell>
              </Row>
            ))}
        </TableContainer>
      </MainContainer>
    </>
  );
}

export default Appointments;
