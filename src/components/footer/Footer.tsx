import { Box, Typography, styled } from "@mui/material";
import LottieAnimation from "../lottieAnimation/LottieAnimation";

const MainContainer = styled(Box)(() => ({
  marginTop: "5rem",
  backgroundColor: "#e1edff",
  width: "100%",
}));
const Container = styled(Box)(() => ({
  width: "10%",
}));
const Heading = styled("p")(() => ({
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "#0A1D56",
  letterSpacing: "1.5px",
}));
const Title = styled("p")(() => ({
  fontSize: "1rem",
  color: "#57535c",
  letterSpacing: "0.35px",
}));
const MailLink = styled("a")(() => ({
  textDecoration: "none",
  display: "block",
  color: "#57535c",
  fontSize: "1rem",
  transition: "color 0.3s ease-in-out, font-size 0.3s ease-in-out",

  "&:hover": {
    fontSize: "1.1rem",
  },
}));

function Footer() {
  return (
    <MainContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          padding: "5rem 5rem 2rem 5rem",
        }}
      >
        <Container sx={{ width: "20%" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LottieAnimation />
            <Heading>All in One Healthcare</Heading>
          </Box>
          <Title>
            The primary objective of a consultant is to use expert knowledge and
            skill to diagnose and treat patients while retaining ultimate
            clinical responsibility for their care. We are 'All in One
            Healthcare' here for help you.
          </Title>
        </Container>

        <Container>
          <Heading>Menu</Heading>
          <Box>
            <Title>Home</Title>
            <Title>Services</Title>
            <Title>Find a Doctor</Title>
            <Title>Contact</Title>
          </Box>
        </Container>

        <Container>
          <Heading>Support</Heading>
          <Box>
            <Title>Terms & Conditions</Title>
            <Title>Privacy Policy</Title>
            <Title>Contact us</Title>
            <Title>FAQ/Help</Title>
            <Title>Resources</Title>
          </Box>
        </Container>

        <Container>
          <Heading>Contact us</Heading>
          <Box>
            <MailLink href="mailto:rahulkar9988@gmail.com">
              rahulkar9988@gmail.com
            </MailLink>
            <MailLink
              href="mailto:britisundar789j@gmail.com"
              sx={{ padding: "0.5rem 0" }}
            >
              britisundar789j@gmail.com
            </MailLink>
            <MailLink href="mailto:hitenagar@gmail.com">
              hitenagar@gmail.com
            </MailLink>
          </Box>
        </Container>
      </Box>

      <Box sx={{ textAlign: "center", paddingBottom: "1rem" }}>
        <hr style={{ width: "60%", opacity: "0.3" }} />
        <Typography
          variant="p"
          sx={{ letterSpacing: "1.5px", color: "#57535c" }}
        >
          All rights reserved @2024
        </Typography>
      </Box>
    </MainContainer>
  );
}

export default Footer;
