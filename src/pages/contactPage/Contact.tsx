import React, { useRef } from 'react';
import { useState } from 'react';
import emailjs from "@emailjs/browser";
import { Box, TextField, Typography, styled } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#e9f0ff",
  display: "flex",
  flexDirection: "column",
  paddingTop: "2rem",
  width: "100%",
  height: "29rem",
  justifyContent: "center",
  alignItems: "center",
  color: "#494a5f",
  [theme.breakpoints.down("sm")]: {
    height: "19rem",
    padding: "0px",
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  color: "#808080",
  letterSpacing: "1px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
}));

const SubHeading = styled(Typography)(({ theme}) => ({
  fontWeight: "bold",
  letterSpacing: "1px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "30px",
    textAlign: "center",
  },
}));

const Content = styled(Typography)(({ theme}) => ({
  letterSpacing: "1px",
  color: "#808080",
  fontSize: "18px",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
    textAlign: "center",
    margin: "0 2rem",
  },
}));

const BottomContainer =  styled(Box)(({ theme }) => ({
  display: "flex",
  width: "80%",
  flexDirection: "row",
  margin: "auto",
  marginTop: "10rem",
  height: "45rem",
  columnGap: "6rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    height: "75rem",
    marginTop: "1rem",
    textAlign: "center",
  },
}));

const ContactCol =  styled(Box)(({ theme }) => ({
  flex: "1",
}));

const Header =  styled(Typography)(({ theme }) => ({
  letterSpacing: "1px",
  fontSize: "40px",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "25px"
  },
}));

const SubHeader =  styled(Typography)(({ theme }) => ({
  letterSpacing: "1px",
  fontSize: "25px",
  fontWeight: "bold",
}));

const MessageCol =  styled(Box)(({ theme }) => ({
  marginTop: "2rem",
  flex: "1",
}));

const TextFeildBox =  styled(Box)(({ theme }) => ({
  flex: "1",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const TextFields =  styled(TextField)(({ theme }) => ({
  margin: "2rem 2rem 2rem 0",
  backgroundColor: "#fff",
  borderRadius: "1px",
  width: "35rem",

  boxShadow: "0 5px 5px rgba(0,0,0,0.1)",
  "&:hover .MuiInputLabel-root": {
    color: "#000",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #808080",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #808080",
    },
    "& input": {
      padding: "0.85rem",
      
      [theme.breakpoints.down("md")]: {
        padding: "0.65rem 0",
        fontSize: "0.75rem",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0.4rem 0",
        fontSize: "0.6rem",
      },
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.8rem",
    width: "100%",
    color: "rgba(0, 0, 0, 0.4)",
    [theme.breakpoints.down("md")]: { fontSize: "0.65rem" },
    [theme.breakpoints.down("sm")]: { fontSize: "0.5rem" },
  },
  [theme.breakpoints.down("sm")]: {
    width: "10rem",
    margin: "7px",
  },
}));

const TextFeilds =  styled(TextField)(({ theme }) => ({
  width: "17rem",
  margin: "1rem 1rem 1rem 0",
  backgroundColor: "#fff",
  borderRadius: "1px",
  
  boxShadow: "0 5px 5px rgba(0,0,0,0.1)",
  "&:hover .MuiInputLabel-root": {
    color: "#000",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #808080",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #808080",
    },
    "& input": {
      padding: "0.85rem",

      [theme.breakpoints.down("md")]: {
        padding: "0.65rem 0",
        fontSize: "0.75rem",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0.4rem 0",
        fontSize: "0.6rem",
      },
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.8rem",
    width: "100%",
    color: "rgba(0, 0, 0, 0.4)",
    [theme.breakpoints.down("md")]: { fontSize: "0.65rem" },
    [theme.breakpoints.down("sm")]: { fontSize: "0.5rem" },
  },
  [theme.breakpoints.down("sm")]: {
    width: "10rem",
    margin: "7px",
  },
}));

const SubmitBtn =  styled("button")(({ theme }) => ({
  display: "inline",
  fontSize: "1rem",
  backgroundColor: "#415da1",
  color: "white",
  padding: "0.5rem",
  borderRadius: "5px",
  boxShadow: "1px 5px 5px rgba(0, 0, 0, 0.2)",
  lineHeight: 1.5,
  cursor: "pointer",
  transition: "font-size 0.2s ease",
  letterSpacing: "0.9px",

  "&:hover": {
    fontSize: "1.1rem",
    boxShadow: "1px 7px 4px rgba(0, 0, 0, 0.2)",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "1rem",
    padding: "0.7rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
    padding: "0.4rem",
    borderRadius: "5px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "7rem",
    margin: "auto",
    fontSize: "0.55rem",
    padding: "0.4rem",
    borderRadius: "3px",
    letterSpacing: "0.7px",
  },
}));

function Contact() {

  const form = useRef(null);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const { name, email, phone, subject, message } = formValues;

    let hasErrors = false;

    // Validate name
    if (!name.trim()) {
      toast.error("Name is required");
      hasErrors = true;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      hasErrors = true;
    }

    // Validate phone
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number format
    if (!phoneRegex.test(phone)) {
      toast.error("Invalid phone number");
      hasErrors = true;
    }

    // Validate subject
    if (!subject.trim()) {
      toast.error("Subject is required");
      hasErrors = true;
    }

    // Validate message
    if (!message.trim()) {
      toast.error("Message is required");
      hasErrors = true;
    }

    if (!hasErrors) {
      // Submit the form data
      emailjs
        .sendForm("service_t3wn9i3", "template_pc7nlwi", form.current, {
          publicKey: "_CnF4kAAuSFifucyH",
        })
        .then(
          () => {
            console.log("SUCCESS!");
            toast.success("Send Successful.");
            form.current.reset();
            setFormValues({
              name: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
            });
          },
          (error) => {
            console.log("FAILED...", error.text);
            toast.error("Unexpected error occurred.");
          }
        );
    }
  };
  
  return (
    <>
    <ToastContainer />
      <TopContainer>
        <Heading>CONTACT</Heading><br />
        <SubHeading variant={"h2"}>Contact Information</SubHeading><br />
        <Content variant="h6" margin={"0 25rem"} textAlign={"center"}>HealthHarbor always help to provide proper treatment for all of get proper cure and
           healthy life which is the most focus thing
        </Content>
      </TopContainer>
      <BottomContainer>
        <ContactCol>
          <Heading>CONTACT WITH US</Heading>
          <Header>Contact Information</Header><br />
          <Content>HealthHarbor always help to provide proper treatment for of get the proper cure and health life
            which is the perate focus thing for us patient our main propriety
          </Content><br /><br />
          <SubHeader>Address</SubHeader><br />
          <Content>40/A, Fuljhore</Content>
          <Content>Durapur, West Bengal</Content><br /><br />
          <SubHeader>Web & Mail</SubHeader><br />
          <Content>rahulkar9988@gmail.com</Content>
          <Content>britisundar789j@gmail.com</Content>
          <Content>hitenagar@gmail.com</Content><br /><br />
          <SubHeader>Phone</SubHeader><br />
          <Content>+916363156098</Content>
          <Content>+912649846329</Content>
        </ContactCol>
        <MessageCol>
          <Header>Send Message</Header><br />
          <Content>HealthHarbor always help to provide proper treatment of the proper cure and health life service</Content><br />
          <form ref={form}>
            <TextFeildBox>
              <TextFeilds 
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                
                autoComplete="name"
              />
              <TextFeilds 
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                
                autoComplete="email"
              />
              <TextFeilds 
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                
                autoComplete="phone"
              />
              <TextFeilds
                required
                fullWidth
                id="subject"
                label="Subject"
                name="subject"
                value={formValues.subject}
                onChange={handleChange}
                
                autoComplete="subject"
              />
              <TextFields
                required
                id="outlined-multiline-static"
                multiline
                rows={7}
                fullWidth
                label="Message"
                name="message"
                value={formValues.message}
                onChange={handleChange}
                
                autoComplete="message"
              />
            </TextFeildBox>
            <br />
            <SubmitBtn type="submit" onClick={sendEmail}>Send Message</SubmitBtn>
          </form>
        </MessageCol>
      </BottomContainer>
    </>
  );
}

export default Contact