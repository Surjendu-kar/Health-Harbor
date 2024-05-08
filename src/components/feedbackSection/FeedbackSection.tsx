import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, styled } from '@mui/material';
import { supabase } from '../../supabase/config';
import { ToastContainer, toast } from 'react-toastify';

const TitleTextField = styled(TextField)(({ theme }) => ({
    marginTop: "1.5rem",
    display: "block",
    backgroundColor: "#fff",
  
    [theme.breakpoints.down("lg")]: {
      marginTop: "1rem",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "0.9rem",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "0.7rem",
    },
  
    "& .MuiInputBase-root": {
      [theme.breakpoints.down("lg")]: {
        fontSize: "0.95rem",
        padding: "0px",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "0.75rem",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.65rem",
      },
    },
    "& .MuiOutlinedInput-input": {
      [theme.breakpoints.down("lg")]: {
        height: "20px",
      },
      [theme.breakpoints.down("md")]: {
        height: "10px",
      },
      [theme.breakpoints.down("sm")]: {
        height: "5px",
        padding: "15px",
      },
    },
  }));

const Heading = styled(Typography)(({ theme }) => ({
    fontSize: "1.05rem",
    marginBottom: "0.5rem",
    [theme.breakpoints.down("lg")]: {
        fontSize: "0.1rem",
        marginBottom: "0.3rem",
    },
    [theme.breakpoints.down("md")]: {
        fontSize: "0.9rem",
        marginBottom: "0.2rem",
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
        marginBottom: "0.1rem",
    },
}));
  
const FeedbackContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const FeedbackItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
}));

interface FeedbackSectionProps {
  doctorId: string;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ doctorId }) => {
  const [feedback, setFeedback] = useState('');
  const [doctorFeedback, setDoctorFeedback] = useState<any[]>([]);

  useEffect(() => {
    const fetchDoctorFeedback = async () => {
      try {
        const { data, error } = await supabase
          .from('doctorFeedback')
          .select('*')
          .eq('doctorId', doctorId);

        if (error) throw error;
        setDoctorFeedback(data);
      } catch (error) {
        console.error('Error fetching doctor feedback:', error);
      }
    };

    fetchDoctorFeedback();
  }, [doctorId]);

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) {
      toast.error('Please enter feedback.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('doctorFeedback')
        .insert([{ feedback, doctorId }]);

      if (error) throw error;
      toast.success('Feedback submitted successfully!');
      setFeedback('');
      setDoctorFeedback([...doctorFeedback, ...data]);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Error submitting feedback.');
    }
  };

  return (
    <FeedbackContainer>
      <Heading>Leave Feedback</Heading>
      <TitleTextField
        sx={{marginTop:0}}
        fullWidth
        multiline
        rows={4}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        label="Write your feedback here..."
      />
      <Button variant="contained" onClick={handleFeedbackSubmit}>
        Submit Feedback
      </Button>
      <Heading>Doctor Feedback</Heading>
      {doctorFeedback.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id}>
          <Typography>{feedbackItem.feedback}</Typography>
        </FeedbackItem>
      ))}
      <ToastContainer />
    </FeedbackContainer>
  );
};

export default FeedbackSection;