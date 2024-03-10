// DoctorCard.js
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyleCard = styled(Card)(({ theme }) => ({
  maxWidth: 200,
  margin: 10,
  borderRadius: "5px",
  [theme.breakpoints.down("lg")]: {
    maxWidth: 190,
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: 120,
    margin: 7,
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 90,
    margin: 5,
  },
}));

const CardMediaStyle = styled(CardMedia)(({ theme }) => ({
  height: 190,
  [theme.breakpoints.down("lg")]: {
    height: 180,
  },
  [theme.breakpoints.down("md")]: {
    height: 140,
  },
  [theme.breakpoints.down("sm")]: {
    height: 100,
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "1.05rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6rem",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.5rem",
  },
}));

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  "&:last-child": {
    paddingBottom: "5px",
  },
  [theme.breakpoints.down("lg")]: {
    padding: "1rem",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0.3rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem",
  },
}));

const DoctorCard = ({ doctor }) => {
  const qualificationsArray = JSON.parse(doctor.qualifications);
  const degrees = qualificationsArray.map((q) => q.degree).join(", ");
  // const universities = qualificationsArray.map((q) => q.university).join(", ");
  const navigate = useNavigate();

  const universityComponents = qualificationsArray.map((q, index) => (
    <Title key={index} variant="body2" color="text.secondary">
      {q.university}
    </Title>
  ));

  return (
    <StyleCard
      onClick={() => navigate("/doctor-details", { state: { doctor } })}
    >
      <CardMediaStyle component="img" image={doctor.img} alt={doctor.name} />
      <CardContentStyle>
        <Heading>{doctor.name}</Heading>
        <Title variant="body2" color="text.secondary">
          {doctor.specialization} ({degrees})
        </Title>
        {universityComponents}
      </CardContentStyle>
    </StyleCard>
  );
};

export default DoctorCard;
