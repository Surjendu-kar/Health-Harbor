import { Box, Typography, styled } from "@mui/material";
import LogoAnimation from "../lottieAnimation/LogoAnimation";

const MainContainer = styled(Box)(({ theme }) => ({
  marginTop: "5rem",
  backgroundColor: "#e1edff",
  width: "100%",
  [theme.breakpoints.down("lg")]: {
    marginTop: "4rem",
  },
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
  [theme.breakpoints.down("lg")]: {
    padding: "2rem 2rem 1rem 2rem",
  },
  [theme.breakpoints.down("md")]: {
    padding: "2rem 2rem 1rem 2rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "1.5rem 0.75rem 0.5rem 0.35rem",
  },
}));

const HealthContainer = styled(Box)(({ theme }) => ({
  width: "20%",
  [theme.breakpoints.down("md")]: {
    width: "25%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "25%",
  },
}));
const MenuContainer = styled(Box)(({ theme }) => ({
  width: "10%",
  [theme.breakpoints.down("md")]: {
    width: "10%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "10%",
  },
}));
const SupportContainer = styled(Box)(({ theme }) => ({
  width: "10%",
  [theme.breakpoints.down("md")]: {
    width: "10%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "10%",
  },
}));
const ContactContainer = styled(Box)(({ theme }) => ({
  width: "10%",
  gap: theme.spacing(8),
  [theme.breakpoints.down("md")]: {
    width: "20%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "20%",
  },
}));

const ContactBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),

  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(0.35),
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  // fontWeight: "bold",
  color: "#0A1D56",
  letterSpacing: "1.5px",
  marginBottom: "0.25rem",

  [theme.breakpoints.down("lg")]: {
    fontSize: "1rem",
    letterSpacing: "1.25px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.9rem",
    letterSpacing: "1.05px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    letterSpacing: "1px",
  },
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  color: "#57535c",
  letterSpacing: "1px",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
    letterSpacing: "1px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.75rem",
    letterSpacing: "0.5px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.5rem",
    letterSpacing: "0.45px",
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
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
    letterSpacing: "0.9px",
  },

  [theme.breakpoints.down("md")]: {
    fontSize: "0.75rem",
    letterSpacing: "0.85px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.43rem",
    letterSpacing: "0.5px",
  },
}));

const ReserveSection = styled(Box)(({ theme }) => ({
  textAlign: "center",
  paddingBottom: "1rem",
  [theme.breakpoints.down("lg")]: {
    paddingBottom: "0.5rem",
  },
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

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.9rem",
    letterSpacing: "1.25px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.75rem",
    letterSpacing: "1px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.42rem",
    letterSpacing: "0.5px",
  },
}));

function Footer() {
  return (
    <MainContainer>
      <SecondMainContainer>
        <HealthContainer>
          <Heading>HealthHarbor</Heading>

          <Title>
            The primary objective of a consultant is to use expert knowledge and
            skill to diagnose and treat patients while retaining ultimate
            clinical responsibility for their care. We are 'All in One
            Healthcare' here for help you.
          </Title>
        </HealthContainer>

        <MenuContainer>
          <Heading>Menu</Heading>
          <Box>
            <Title>Home</Title>
            <Title>Services</Title>
            <Title>Find a Doctor</Title>
            <Title>Contact</Title>
          </Box>
        </MenuContainer>

        <SupportContainer>
          <Heading>Support</Heading>
          <Box>
            <Title>Terms & Conditions</Title>
            <Title>Privacy Policy</Title>
            <Title>Contact us</Title>
            <Title>FAQ/Help</Title>
            <Title>Resources</Title>
          </Box>
        </SupportContainer>

        <ContactContainer>
          <Heading>Contact us</Heading>
          <ContactBox>
            <Box>
              <MailLink href="mailto:rahulkar9988@gmail.com">
                rahulkar9988@gmail.com
              </MailLink>
            </Box>
            <Box>
              <MailLink href="mailto:britisundar789j@gmail.com">
                britisundar789j@gmail.com
              </MailLink>
            </Box>
            <Box>
              <MailLink href="mailto:hitenagar@gmail.com">
                hitenagar@gmail.com
              </MailLink>
            </Box>
          </ContactBox>
        </ContactContainer>
      </SecondMainContainer>

      <ReserveSection>
        <hr style={{ width: "60%", opacity: "0.3" }} />
        <ReserveTitle>All rights reserved @2024</ReserveTitle>
      </ReserveSection>
    </MainContainer>
  );
}

export default Footer;
