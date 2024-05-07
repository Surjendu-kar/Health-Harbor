import { Box, styled } from "@mui/material";
import { User } from "@supabase/supabase-js";

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
            <Cell>USER EMAIL</Cell>
            <Cell>GENDER</Cell>
            <Cell>PAYMENT</Cell>
            <Cell>PRICE</Cell>
            <Cell>BOOKED ON</Cell>
          </Row>
          {appointments.map((appointment, index) => (
            <Row key={index} sx={{ border: "1px solid black" }}>
              <Cell>{appointment.user_email}</Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell>
                {appointment.appointment_date} _ {appointment.appointment_time}
              </Cell>
            </Row>
          ))}
        </TableContainer>
      </MainContainer>
    );
  }
}

export default Appointments;
