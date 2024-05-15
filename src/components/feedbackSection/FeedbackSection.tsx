import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  styled,
  Rating,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { supabase } from "../../supabase/config";
import { User } from "@supabase/supabase-js";

const FeedbackContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const FeedbackItem = styled(Box)(({ theme }) => ({
  marginBottom: "1rem",
  padding: "1rem",
  backgroundColor: theme.palette.grey[200],
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(0),
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

const GetRating = styled(Rating)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(22),
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

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const FeedbackSection: React.FC = ({ fetchedData }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [doctorFeedback, setDoctorFeedback] = useState<
    { id: string; feedback: string; rating: number; likedBy: string[] }[]
  >([]);

  const [user, setUser] = useState<User | null>(null);

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      fetchFeedbackData();
    };

    getUser();
  }, []);

  const fetchFeedbackData = async () => {
    const { data: feedbackData, error } = await supabase
      .from("doctorInfo")
      .select("feedback")
      .eq("email", fetchedData.email);

    if (error) {
      console.error("Error fetching data:", error);
    } else if (
      feedbackData &&
      feedbackData.length > 0 &&
      feedbackData[0].feedback
    ) {
      try {
        const parsedFeedback = JSON.parse(feedbackData[0].feedback);
        if (Array.isArray(parsedFeedback)) {
          setDoctorFeedback(parsedFeedback);
        } else {
          setDoctorFeedback([]);
        }
      } catch (parseError) {
        console.error("Error parsing feedback data:", parseError);
        setDoctorFeedback([]);
      }
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) {
      toast.error("Please enter feedback.");
      return;
    }

    if (rating === null) {
      toast.error("Please provide a rating.");
      return;
    }
    if (!user || !user.email) {
      toast.error("Please log in to submit feedback.");
      return;
    }

    let userName = "Anonymous";
    try {
      const { data: patientData, error: patientError } = await supabase
        .from("patientInfo")
        .select("name, appointment")
        .eq("email", user.email)
        .single();

      if (patientError) {
        console.error("Error fetching user details:", patientError);
        toast.error("Error fetching user details.");
        return;
      }

      if (patientData && patientData.appointment) {
        const appointments = JSON.parse(patientData.appointment);

        // Check if the user has an appointment with the doctor matching fetchedData.email
        const hasValidAppointment = appointments.some(
          (appointment) =>
            appointment.doctorEmail === fetchedData.email &&
            appointment.appointmentDate &&
            appointment.appointmentTime
        );

        if (!hasValidAppointment) {
          toast.info(
            "You can only leave feedback for doctors you have appointments with."
          );
          return;
        }
      } else {
        toast.info("No valid appointments found.");
        return;
      }
      // Fetch user's name and proceed to submit feedback
      userName = patientData.name || "Anonymous";
    } catch (err) {
      console.error("Error retrieving user information:", err);
    }

    const newFeedbackItem = {
      id: Date.now().toString(),
      feedback,
      rating,
      likedBy: [],
      name: userName,
    };

    try {
      const { data: existingFeedback, error: fetchError } = await supabase
        .from("doctorInfo")
        .select("feedback")
        .eq("email", fetchedData.email)
        .single();

      if (fetchError) {
        toast.error("Error fetching existing feedback.");
        return;
      }

      const updatedFeedback = existingFeedback.feedback
        ? JSON.parse(existingFeedback.feedback)
        : [];
      updatedFeedback.push(newFeedbackItem);

      const { error } = await supabase
        .from("doctorInfo")
        .update({ feedback: JSON.stringify(updatedFeedback) })
        .eq("email", fetchedData.email);

      if (error) throw error;

      setDoctorFeedback(updatedFeedback);
      toast.success("Feedback submitted successfully!");
      setFeedback("");
      setRating(null);
    } catch (error) {
      toast.error("Error submitting feedback.");
      console.error("Error submitting feedback:", error);
    }
  };
  const handleLike = async (feedbackId: string) => {
    if (!user || !user.email) {
      toast.info("Please login to like the feedback.");
      return;
    }

    const userEmail = user.email;

    setDoctorFeedback((prevFeedback) =>
      prevFeedback.map((item) => {
        if (item.id === feedbackId) {
          const isAlreadyLiked = item.likedBy.includes(userEmail);
          const updatedLikedBy = isAlreadyLiked
            ? item.likedBy.filter((email) => email !== userEmail) // Remove the user's email if already liked
            : [...item.likedBy, userEmail]; // Add the user's email if not already liked

          // Perform the database update asynchronously
          updateFeedbackInDatabase(feedbackId, updatedLikedBy, isAlreadyLiked);

          return { ...item, likedBy: updatedLikedBy }; // Update the state with the new likedBy array
        }
        return item;
      })
    );
  };

  const updateFeedbackInDatabase = async (
    feedbackId,
    likedBy,
    isAlreadyLiked
  ) => {
    try {
      const { data: existingData, error } = await supabase
        .from("doctorInfo")
        .select("feedback")
        .eq("email", fetchedData.email)
        .single();

      if (error) throw error;

      if (!existingData || !existingData.feedback) {
        console.error("No feedback data available");
        return;
      }

      // Parse the feedback JSON string into an array
      let feedbackArray;
      try {
        feedbackArray = JSON.parse(existingData.feedback);
      } catch (parseError) {
        console.error("Error parsing feedback data:", parseError);
        return;
      }

      if (!Array.isArray(feedbackArray)) {
        console.error("Parsed feedback data is not an array:", feedbackArray);
        return;
      }

      // Update the feedback array with the new likedBy array
      const updatedFeedback = feedbackArray.map((item) => {
        if (item.id === feedbackId) {
          return { ...item, likedBy };
        }
        return item;
      });

      // Update the feedback in the database
      const { error: updateError } = await supabase
        .from("doctorInfo")
        .update({ feedback: JSON.stringify(updatedFeedback) })
        .eq("email", fetchedData.email);

      if (updateError) throw updateError;

      if (isAlreadyLiked) {
        toast.success("Unlike successful!");
      } else {
        toast.success("Like successful!");
      }
    } catch (error) {
      console.error("Error updating feedback likes:", error);
      toast.error("Error updating likes.");
    }
  };

  const hasLikedFeedback = (feedbackId) => {
    const feedback = doctorFeedback.find((item) => item.id === feedbackId);
    return feedback?.likedBy.includes(user?.email || "") || false; // Now checking against user.email
  };

  return (
    <FeedbackContainer>
      {user && (
        <>
          <Heading variant="h5">Leave Feedback</Heading>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <GetRating
              name="rating"
              value={rating || 0}
              onChange={(_, newValue) => setRating(newValue)}
              precision={0.5}
            />
          </Box>
        </>
      )}
      {user ? (
        <>
          <TextField
            fullWidth
            multiline
            rows={isSmallScreen ? 3 : 4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here..."
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleFeedbackSubmit}
            disabled={!user}
          >
            Submit Feedback
          </Button>
        </>
      ) : (
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Log in to submit feedback.
        </Typography>
      )}
      <Heading variant="h5" sx={{ marginTop: 4 }}>
        Doctor Feedback
      </Heading>
      {Array.isArray(doctorFeedback) &&
        doctorFeedback.map((feedbackItem) => (
          <FeedbackItem key={feedbackItem.id}>
            <Box sx={{ display: "flex" }} gap={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {feedbackItem.name || "Anonymous"}
              </Typography>
              <RatingContainer>
                <ShowRating
                  name="rating"
                  value={feedbackItem.rating}
                  precision={0.5}
                  readOnly
                />
              </RatingContainer>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography>{feedbackItem.feedback}</Typography>
              <IconButton
                aria-label="like"
                onClick={() => handleLike(feedbackItem.id)}
                size="small"
                color={hasLikedFeedback(feedbackItem.id) ? "error" : "default"}
                disabled={!user}
              >
                {hasLikedFeedback(feedbackItem.id) ? (
                  <FavoriteIcon fontSize="small" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
                <Typography variant="body2">
                  {feedbackItem.likedBy.length}
                </Typography>
              </IconButton>
            </Box>
          </FeedbackItem>
        ))}
      <ToastContainer />
    </FeedbackContainer>
  );
};

export default FeedbackSection;
