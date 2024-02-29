// DoctorCard.js
import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const qualificationsArray = JSON.parse(doctor.qualifications);
  const degrees = qualificationsArray.map((q) => q.degree).join(", ");
  // const universities = qualificationsArray.map((q) => q.university).join(", ");
  const navigate = useNavigate();

  const universityComponents = qualificationsArray.map((q, index) => (
    <Typography key={index} variant="body2" color="text.secondary">
      {q.university}
    </Typography>
  ));

  return (
    <Card
      sx={{ maxWidth: 345, m: 2, borderRadius: "5px" }}
      onClick={() => navigate("/doctor-details", { state: { doctor } })}
    >
      <CardMedia
        component="img"
        height="200"
        image={doctor.img}
        alt={doctor.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ marginBottom: "0" }}
        >
          {doctor.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {doctor.specialization}({degrees})
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {universities}
        </Typography> */}
        {universityComponents}
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
