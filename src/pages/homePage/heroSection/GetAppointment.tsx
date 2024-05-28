import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Box, Typography, styled, Card, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "2.2rem",
  fontWeight: "bold",
  color: "#15285ce8",
  letterSpacing: "0.5px",
  [theme.breakpoints.down("lg")]: {
    fontSize: "1.6rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.1rem",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    textAlign: "center",
    letterSpacing: "0.5px",
    margin: "1rem 0",
  },
}));

const GetAppointmentBtn = styled(Typography)(({ theme }) => ({
  display: "inline",
  fontSize: "1.25rem",
  backgroundColor: "#deeaff8f",
  padding: "0.8rem",
  borderRadius: "7px",
  boxShadow: "1px 5px 5px rgba(0, 0, 0, 0.2)",
  lineHeight: 2.5,
  cursor: "pointer",
  transition: "font-size 0.2s ease",
  letterSpacing: "0.85px",
  marginTop: "4rem",
  "&:hover": {
    fontSize: "1.3rem",
    boxShadow: "1px 7px 4px rgba(0, 0, 0, 0.2)",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "1rem",
    padding: "0.7rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.85rem",
    padding: "0.55rem",
    borderRadius: "5px",
    marginLeft: "0.75rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.55rem",
    padding: "0.4rem",
    marginLeft: "0.5rem",
    borderRadius: "3px",
    letterSpacing: "0.7px",
  },
}));

const VideoContainer = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  position: "relative",
  padding: "0.5rem 0",
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem 0",
  },
}));

const VideoPlayer = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  paddingTop: "56.25%", // Maintain aspect ratio (16:9)
}));

const VideoOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage:
    "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6))",
  zIndex: 1,
  pointerEvents: "none",
}));

const LoadingSpinner = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 2,
  "& .MuiCircularProgress-root": {
    color: theme.palette.primary.main,
  },
}));

function GetAppointment() {
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const sectionRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (playerRef.current) {
        const player = playerRef.current;
        if (entry.isIntersecting) {
          setIsPlaying(true);
          player.seekTo(0); // Reset video to start
        } else {
          setIsPlaying(false);
        }
      }
    });
  };

  useEffect(() => {
    if (sectionRef.current) {
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
      });
      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <Box ref={sectionRef}>
      <Heading>Easily Can Get An Appointment</Heading>
      <VideoContainer>
        <VideoPlayer>
          {isLoading && (
            <LoadingSpinner>
              <CircularProgress />
            </LoadingSpinner>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isPlaying ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <ReactPlayer
              ref={playerRef}
              url={"https://youtu.be/1dI7qkKQBak"}
              controls={true}
              width="100%"
              height="100%"
              playing={isPlaying}
              onReady={() => setIsLoading(false)}
            />
          </motion.div>
          <VideoOverlay />
        </VideoPlayer>
      </VideoContainer>
      <Box mt={2}>
        <GetAppointmentBtn onClick={() => navigate("/find-a-doctor")}>
          Get Appointment
        </GetAppointmentBtn>
      </Box>
    </Box>
  );
}

export default GetAppointment;
