import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabase/config";
import CheckIcon from "@mui/icons-material/Check";

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
  padding: "0.5rem 0",
}));

const Cell = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "12px",
  letterSpacing: "0.5px",
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

function PatientAppointment({ user }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("patientInfo")
            .select("appointment")
            .eq("email", user.email)
            .single();

          if (error) {
            console.error("Error fetching patientInfo:", error);
          } else {
            setAppointments(JSON.parse(data.appointment));
          }
        } catch (error) {
          console.error("Error fetching patientInfo:", error);
        }
      }
    };
    fetchPatientInfo();
  }, []);
  return (
    <MainContainer>
      <TableContainer>
        <Row
          sx={{
            backgroundColor: "#c3c9fa59",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
          }}
        >
          <Cell>Doctor Email</Cell>
          <Cell>Doctor Name</Cell>
          <Cell>Appointment Date & Time</Cell>
          <Cell>Payment</Cell>
        </Row>
        {appointments &&
          appointments.map((appointment, index) => (
            <Row key={index} sx={{ border: "1px solid black" }}>
              <Cell>{appointment?.doctorEmail || ""}</Cell>
              <Cell>{appointment?.doctorName || ""}</Cell>
              <Cell>
                {appointment?.appointmentDate && appointment?.appointmentTime
                  ? `${appointment?.appointmentDate
                      .split("-")
                      .reverse()
                      .join("-")} - ${formatTime(appointment.appointmentTime)}`
                  : "Not set by doctor yet"}
              </Cell>
              <Cell>
                {appointment.payment && <CheckIcon color="success" />}
              </Cell>
            </Row>
          ))}
      </TableContainer>
    </MainContainer>
  );
}

export default PatientAppointment;
