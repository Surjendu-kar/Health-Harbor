import React, { useState } from 'react';
import { Box, Typography, TextField, Button, styled, Rating, useMediaQuery, IconButton } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FeedbackContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const FeedbackItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const FeedbackSection: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [doctorFeedback, setDoctorFeedback] = useState<
    { id: string; feedback: string; rating: number; likedBy: string[] }[]
  >([
    {
      id: '1',
      feedback: 'Great doctor! Very knowledgeable and caring.',
      rating: 4.5,
      likedBy: ['user1', 'user2'],
    },
    {
      id: '2',
      feedback: 'The doctor was patient and answered all my questions.',
      rating: 5,
      likedBy: ['user3'],
    },
    {
      id: '3',
      feedback: 'Could have been more attentive to my concerns.',
      rating: 3,
      likedBy: [],
    },
  ]);

  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isLoggedIn = true; // Replace with your actual login state
  const currentUser = 'user4'; // Replace with your actual user ID

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) {
      toast.error('Please enter feedback.');
      return;
    }

    if (rating === null) {
      toast.error('Please provide a rating.');
      return;
    }

    const newFeedbackItem = {
      id: Date.now().toString(),
      feedback,
      rating,
      likedBy: [],
    };
    setDoctorFeedback([...doctorFeedback, newFeedbackItem]);
    toast.success('Feedback submitted successfully!');
    setFeedback('');
    setRating(null);
  };

  const handleLike = (feedbackId: string) => {
    if (!isLoggedIn) {
      toast.info('Please login to like the feedback.');
      return;
    }

    setDoctorFeedback((prevFeedback) =>
      prevFeedback.map((item) => {
        if (item.id === feedbackId) {
          if (item.likedBy.includes(currentUser)) {
            toast.info('You have already liked this feedback.');
            return item;
          }
          return { ...item, likedBy: [...item.likedBy, currentUser] };
        }
        return item;
      })
    );
  };

  const hasLikedFeedback = (feedbackId: string) => {
    const feedback = doctorFeedback.find((item) => item.id === feedbackId);
    return feedback?.likedBy.includes(currentUser) || false;
  };

  return (
    <FeedbackContainer>
      <Heading variant="h5">Leave Feedback</Heading>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Rating
          name="rating"
          value={rating || 0}
          onChange={(_, newValue) => setRating(newValue)}
          precision={0.5}
          size={isSmallScreen ? 'medium' : 'large'}
        />
      </Box>
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
      <Button variant="contained" onClick={handleFeedbackSubmit}>
        Submit Feedback
      </Button>
      <Heading variant="h5" sx={{ marginTop: 4 }}>
        Doctor Feedback
      </Heading>
      {doctorFeedback.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id}>
          <RatingContainer>
            <Rating
              name="rating"
              value={feedbackItem.rating}
              precision={0.5}
              size={isSmallScreen ? 'small' : 'medium'}
              readOnly
            />
            <Typography variant="body2">{feedbackItem.rating}</Typography>
          </RatingContainer>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>{feedbackItem.feedback}</Typography>
            <IconButton
              aria-label="like"
              onClick={() => handleLike(feedbackItem.id)}
              size="small"
              color="error"
              disabled={!isLoggedIn || hasLikedFeedback(feedbackItem.id)}
            >
              {hasLikedFeedback(feedbackItem.id) ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
              <Typography variant="body2">{feedbackItem.likedBy.length}</Typography>
            </IconButton>
          </Box>
        </FeedbackItem>
      ))}
      <ToastContainer />
    </FeedbackContainer>
  );
};

export default FeedbackSection;