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
  LinearProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { supabase } from "../../supabase/config";
import { User } from "@supabase/supabase-js";
import { useTheme } from "@mui/material/styles";

const FeedbackContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "1.25rem",
  borderRadius: "5px",
  boxShadow: theme.shadows[3],
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: { padding: "1rem" },
  [theme.breakpoints.down("sm")]: { padding: "0.5rem" },
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
  [theme.breakpoints.down("lg")]: { marginBottom: "0.7rem" },
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {
    marginBottom: "0.25rem",
    padding: "0.5rem 0.75rem",
  },
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

const GetRating = styled(Rating)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(22),
  [theme.breakpoints.down("lg")]: {
    fontSize: theme.typography.pxToRem(16),
  },
  [theme.breakpoints.down("md")]: {
    fontSize: theme.typography.pxToRem(14),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.pxToRem(12),
  },
}));

const ShowRating = styled(Rating)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(18),
  [theme.breakpoints.down("lg")]: {
    fontSize: theme.typography.pxToRem(16),
  },
  [theme.breakpoints.down("md")]: {
    fontSize: theme.typography.pxToRem(14),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.pxToRem(12),
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.2rem",
  marginBottom: "1.5rem",

  [theme.breakpoints.down("lg")]: { fontSize: "1rem", marginBottom: "1rem" },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
    marginBottom: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    marginBottom: "0.5rem",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "0.92rem",
  fontWeight: "bold",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: { fontSize: "0.65rem" },
}));
const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: { fontSize: "0.55rem" },
}));

const SubmitBtn = styled(Button)(({ theme }) => ({
  marginBottom: "2rem",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
    marginBottom: "1.75rem",
  },
  [theme.breakpoints.down("md")]: { fontSize: "0.75rem" },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "1rem",
    fontSize: "0.5rem",
    padding: "0.25rem 1rem",
  },
}));

const LikeIcon = styled(FavoriteBorderIcon)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(17),
  [theme.breakpoints.down("md")]: {
    fontSize: theme.typography.pxToRem(14),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.pxToRem(10),
  },
}));

const LikedIcon = styled(FavoriteIcon)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(17),
  [theme.breakpoints.down("md")]: {
    fontSize: theme.typography.pxToRem(14),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.pxToRem(10),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "1rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
    "& .MuiInputBase-root": {
      fontSize: "0.9rem",
      padding: "1rem",
    },
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
    "& .MuiInputBase-root": {
      fontSize: "0.7rem",
      padding: "0.7rem",
    },
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    "& .MuiInputBase-root": {
      fontSize: "0.6rem",
      padding: "0.5rem",
    },
  },
}));

const FeedbackSection: React.FC = ({ fetchedData }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [doctorFeedback, setDoctorFeedback] = useState<
    { id: string; feedback: string; rating: number; likedBy: string[] }[]
  >([]);

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      await fetchFeedbackData();
      setIsLoading(false);
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
      // Fetch user's name
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
            ? item.likedBy.filter((email) => email !== userEmail)
            : [...item.likedBy, userEmail];

          updateFeedbackInDatabase(feedbackId, updatedLikedBy, isAlreadyLiked);

          return { ...item, likedBy: updatedLikedBy };
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
    return feedback?.likedBy.includes(user?.email || "") || false;
  };

  const theme = useTheme();

  const LoadingIndicator = () => (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <FeedbackContainer>
      {user && (
        <>
          <Heading>Leave Feedback</Heading>
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
          <StyledTextField
            fullWidth
            multiline
            rows={isSmallScreen ? 3 : 4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here..."
            variant="outlined"
          />
          <SubmitBtn
            variant="contained"
            onClick={handleFeedbackSubmit}
            disabled={!user}
          >
            Submit Feedback
          </SubmitBtn>
        </>
      ) : (
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Log in to submit feedback.
        </Typography>
      )}
      <Heading>Doctor Feedback</Heading>
      {Array.isArray(doctorFeedback) && doctorFeedback.length > 0 ? (
        doctorFeedback.map((feedbackItem) => (
          <FeedbackItem key={feedbackItem.id}>
            <Box sx={{ display: "flex" }} gap={1}>
              <Title variant="subtitle1">
                {feedbackItem.name || "Anonymous"}
              </Title>
              <RatingContainer>
                <ShowRating
                  name="rating"
                  value={feedbackItem.rating}
                  precision={0.5}
                  readOnly
                />
              </RatingContainer>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                [theme.breakpoints.down("sm")]: {
                  gap: 0.2,
                },
              }}
            >
              <SubTitle>{feedbackItem.feedback}</SubTitle>
              <IconButton
                aria-label="like"
                onClick={() => handleLike(feedbackItem.id)}
                size="small"
                color={hasLikedFeedback(feedbackItem.id) ? "error" : "default"}
                disabled={!user}
              >
                {hasLikedFeedback(feedbackItem.id) ? (
                  <LikedIcon />
                ) : (
                  <LikeIcon />
                )}
                <SubTitle variant="body2">
                  {feedbackItem.likedBy.length}
                </SubTitle>
              </IconButton>
            </Box>
          </FeedbackItem>
        ))
      ) : (
        <Typography variant="body2" sx={{ marginTop: 2, fontStyle: "italic" }}>
          There is no feedback yet.
        </Typography>
      )}
      <ToastContainer />
    </FeedbackContainer>
  );
};

export default FeedbackSection;
