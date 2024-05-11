import { Box, styled } from "@mui/material";
import { User } from "@supabase/supabase-js";

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
  textAlign: "center",
  fontSize: "12px",
  letterSpacing: "0.5px",
}));

type Appointment = {
  bookAppointment: string;
};

function Appointments({
  user,
  fetchedData,
}: {
  user: User;
  fetchedData: Appointment | null;
}) {
  
  if (fetchedData && fetchedData.bookAppointment) {
    const appointments = JSON.parse(fetchedData.bookAppointment);

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
            <Cell>Patient Details</Cell>
            <Cell>About problem</Cell>
            <Cell>Address</Cell>
            <Cell>EmergencyContact</Cell>
            <Cell>Payement</Cell>
            <Cell>Booked On</Cell>
          </Row>
          {appointments &&
            appointments.map((appointment, index) => (
              <Row
                key={index}
                sx={{ border: "1px solid black", padding: "2px" }}
              >
                <Cell sx={{ textAlign: "left" }}>
                  Email: {appointment.patientDetails.patientEmail}
                  <br />
                  Name: {appointment.patientDetails.patientName}
                  <br />
                  Gender: {appointment.patientDetails.patientGender}
                  <br />
                  Phone No: {appointment.patientDetails.patientPhone}
                  <br />
                  Height: {appointment.patientDetails.patientHeight} <br />
                  Weight: {appointment.patientDetails.patientWeight} <br />
                  Blood Group: {appointment.patientDetails.patientBloodGroup}
                  <br />
                  Date Of Birth:{" "}
                  {appointment.patientDetails.patientDateOfBirth.slice(0, 10)}
                </Cell>

                <Cell sx={{ textAlign: "left" }}>
                  About Problem: {appointment.patientPrb.aboutProblem}
                  <br />
                  Allergies: {appointment.patientPrb.allergies}
                </Cell>

                <Cell sx={{ textAlign: "left" }}>
                  Address: {appointment.patientAddress.address}
                  <br />
                  City: {appointment.patientAddress.city}
                </Cell>

                <Cell sx={{ textAlign: "left" }}>
                  Name: {appointment.emergency.name}
                  <br />
                  Relation: {appointment.emergency.relationship}
                  <br />
                  Phone No: {appointment.emergency.phone}
                  <br />
                  {appointment.emergency.email && (
                    <>
                      Email: {appointment.emergency.email} <br />
                    </>
                  )}
                </Cell>
                <Cell sx={{ textAlign: "center" }}></Cell>

                <Cell sx={{ textAlign: "center" }}>
                  {appointment.appointment_date} _{" "}
                  {appointment.appointment_time}
                </Cell>
              </Row>
            ))}
        </TableContainer>
      </MainContainer>
    );
  }
}

export default Appointments;
