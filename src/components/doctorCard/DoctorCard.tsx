// DoctorCard.js
import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  styled,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/config";

const StyleCard = styled(Card)(({ theme }) => ({
  maxWidth: 200,
  margin: 10,
  borderRadius: "5px",
  boxShadow: "1px 5px 8px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "1px 8px 8px rgba(0, 0, 0, 0.2)",
  },
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

const ShowRating = styled(Rating)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(18),
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.pxToRem(12),
  },
  [theme.breakpoints.down("md")]: {
    fontSize: theme.typography.pxToRem(14),
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: theme.typography.pxToRem(16),
  },
}));

const DoctorCard = ({ doctor }) => {
  const [rating, setRating] = useState(3);
  const qualificationsArray = JSON.parse(doctor.qualifications);
  const degrees = qualificationsArray.map((q) => q.degree).join(", ");
  // const universities = qualificationsArray.map((q) => q.university).join(", ");
  const navigate = useNavigate();

  const universityComponents = qualificationsArray.map((q, index) => (
    <Title key={index} variant="body2" color="text.secondary">
      {q.university}
    </Title>
  ));
  // fetch feedback
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const { data: doctorInfo, error } = await supabase
          .from("doctorInfo")
          .select("feedback")
          .eq("email", doctor.email)
          .single();

        if (error) {
          console.error("Error fetching doctor info:", error);
          return;
        }

        if (doctorInfo && doctorInfo.feedback) {
          const feedback = JSON.parse(doctorInfo.feedback);
          if (feedback.length > 0) {
            const totalRating = feedback.reduce(
              (acc, curr) => acc + curr.rating,
              0
            );
            const averageRating = totalRating / feedback.length;
            setRating(parseFloat(averageRating.toFixed(1))); // Ensures the average is a float and rounded to one decimal
          }
        }
      } catch (error) {
        console.error("Error processing doctor info:", error);
      }
    };

    fetchDoctorInfo();
  }, [doctor.email]);

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
        <ShowRating name="read-only" value={rating} precision={0.5} readOnly />
      </CardContentStyle>
    </StyleCard>
  );
};

export default DoctorCard;
