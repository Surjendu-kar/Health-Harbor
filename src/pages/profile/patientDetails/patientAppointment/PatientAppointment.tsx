import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabase/config";

const MainContainer = styled(Box)(() => ({
  width: "50%",
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
  textAlign: "center",
  fontSize: "12px",
  letterSpacing: "0.5px",
}));

function PatientAppointment({ user }) {
  const [appointments, setAppointments] = useState();

  useEffect(() => {
    const fetchPatientInfo = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("patientInfo")
            .select("appointment")
            .eq("email", user.email)
            .single();
          // console.log(data);

          if (error) {
            console.error("Error fetching patientInfo:", error);
          } else {
            setAppointments(data);
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
          <Cell>Payment</Cell>
          <Cell>Appointment Date</Cell>
          <Cell> Approve</Cell>
        </Row>
        {/* {appointments.map((appointment, index) => (
          <Row key={index} sx={{ border: "1px solid black" }}>
            <Cell>{appointment.doctorEmail}</Cell>
            <Cell></Cell>
            <Cell></Cell>
            <Cell></Cell>
            <Cell>
              {appointment.appointmentDate} _ {appointment.appointmentTime}
            </Cell>
          </Row>
        ))} */}
      </TableContainer>
    </MainContainer>
  );
}

export default PatientAppointment;
