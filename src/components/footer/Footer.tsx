import { Box, Typography, styled } from "@mui/material";
import LogoAnimation from "../lottieAnimation/LogoAnimation";

const MainContainer = styled(Box)(({ theme }) => ({
  marginTop: "5rem",
  backgroundColor: "#e1edff",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    marginTop: "3rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "1rem",
  },
}));
const SecondMainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  padding: "5rem 5rem 2rem 5rem",
  [theme.breakpoints.down("md")]: {
    padding: "3rem 3rem 1rem 3rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem",
  },
}));

const Container = styled(Box)(() => ({
  width: "10%",
}));

const MedicineStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "50px",
  height: "55px",
  [theme.breakpoints.down("lg")]: {
    width: "50px",
    height: "50px",
  },
  [theme.breakpoints.down("md")]: {
    width: "30px",
    height: "30px",
  },
  [theme.breakpoints.down("sm")]: { width: "15px", height: "15px" },
}));

const Heading = styled("p")(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "#0A1D56",
  letterSpacing: "1.5px",

  [theme.breakpoints.down("md")]: {
    fontSize: "0.85rem",
    letterSpacing: "1.25px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.4rem",
    letterSpacing: "1px",
  },
}));
const Title = styled("p")(({ theme }) => ({
  fontSize: "1rem",
  color: "#57535c",
  letterSpacing: "0.35px",

  [theme.breakpoints.down("md")]: {
    fontSize: "0.65rem",
    letterSpacing: "0.25px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.35rem",
    letterSpacing: "0.25px",
  },
}));

const MailLink = styled("a")(({ theme }) => ({
  textDecoration: "none",
  display: "block",
  color: "#57535c",
  fontSize: "1rem",
  letterSpacing: "1.5px",

  transition: "color 0.3s ease-in-out, font-size 0.3s ease-in-out",

  "&:hover": {
    fontSize: "1.1rem",
  },

  [theme.breakpoints.down("md")]: {
    fontSize: "0.65rem",
    letterSpacing: "0.5px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.35rem",
    letterSpacing: "0.25px",
  },
}));

const ReserveSection = styled(Box)(({ theme }) => ({
  textAlign: "center",
  paddingBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    paddingBottom: "0.45rem",
  },
  [theme.breakpoints.down("sm")]: {
    paddingBottom: "0.2rem",
  },
}));

const ReserveTitle = styled("p")(({ theme }) => ({
  letterSpacing: "1.5px",
  color: "#57535c",
  fontSize: "1rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.35rem",
  },
}));

function Footer() {
  return (
    <MainContainer>
      <SecondMainContainer>
        <Container sx={{ width: "20%" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MedicineStyle>
              <LogoAnimation />
            </MedicineStyle>
            <Heading>HealthHarbor</Heading>
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
      </SecondMainContainer>

      <ReserveSection>
        <hr style={{ width: "60%", opacity: "0.3" }} />
        <ReserveTitle>All rights reserved @2024</ReserveTitle>
      </ReserveSection>
    </MainContainer>
  );
}

export default Footer;
