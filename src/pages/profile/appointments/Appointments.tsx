import { Box, styled } from "@mui/material";
const MainContainer = styled(Box)(() => ({
  width: "50%",
  margin: "2rem 0",
}));
const Heading = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "#c3c9fa59",
}));
const TextStyle = styled("p")(() => ({
  margin: 0,
  fontSize: "12px",
  padding: "0.5rem 0",
}));
function Appointments({ user }) {
  return (
    <MainContainer>
      <Heading>
        <TextStyle>NAME</TextStyle>
        <TextStyle>GENDER</TextStyle>
        <TextStyle>PAYMENT</TextStyle>
        <TextStyle>PRICE</TextStyle>
        <TextStyle>BOOKED ON</TextStyle>
      </Heading>
    </MainContainer>
  );
}

export default Appointments;
