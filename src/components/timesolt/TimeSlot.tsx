// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/system";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../supabase/config";
import { useEffect, useState } from "react";
import FetchData from "../../supabase/FetchData";

const Text = styled(Typography)(() => ({
  margin: "1.5rem 0 0.5rem 0",
  fontSize: "0.9rem",
}));

const createTimeSlot = (day = "", startTime = null, endTime = null) => ({
  day,
  startTime,
  endTime,
});

type DoctorInfo = {
  id: number;
  name: string;
  email: string;
  phoneNo: string;
  bio: string;
  gender: string;
  specialization: string;
  price: number;
  qualifications: string[];
  experiences: string[];
  timeSlot: string[];
  about: string;
};

function TimeSlot({ slot, onTimeSlotChange }) {
  const [timeSlot, setTimeSlot] = useState(slot || createTimeSlot());
  const [isComplete, setIsComplete] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [fetchedData, setFetchedData] = useState<DoctorInfo | null>(null);

  const handleDayChange = (event) => {
    setTimeSlot({ ...timeSlot, day: event.target.value });
  };

  const handleStartTimeChange = (newValue) => {
    const formattedStartTime = newValue ? newValue.format("HH:mm:ss") : null;
    setTimeSlot({ ...timeSlot, startTime: formattedStartTime });
  };

  const handleEndTimeChange = (newValue) => {
    const formattedEndTime = newValue ? newValue.format("HH:mm:ss") : null;
    setTimeSlot({ ...timeSlot, endTime: formattedEndTime });
  };

  useEffect(() => {
    const complete = timeSlot.day && timeSlot.startTime && timeSlot.endTime;
    if (complete && !isComplete) {
      console.log(timeSlot);
      setIsComplete(true);
    }
    if (!complete) {
      setIsComplete(false);
    }
    onTimeSlotChange(timeSlot);
  }, [timeSlot, onTimeSlotChange]);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  useEffect(() => {
    if (!fetchedData && user?.email) {
      const fetchData = async () => {
        const { data, error } = await FetchData({ userEmail: user.email });
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setFetchedData(data[0]);
        }
      };

      fetchData();
    }
  }, [user?.email, fetchedData]);

  return (
    <Box sx={{ display: "flex", width: "100%", gap: "1rem" }}>
      {/* Day Box */}
      <Box width={"30%"}>
        <Text>Day</Text>
        <FormControl fullWidth>
          <InputLabel>Select</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Day"
            value={
              fetchedData && fetchedData.timeSlot
                ? JSON.parse(fetchedData.timeSlot)[0].day
                : timeSlot.day
            }
            onChange={handleDayChange}
            sx={{ backgroundColor: "#fff" }}
            disabled={!!fetchedData}
          >
            <MenuItem value="sunday">Sunday</MenuItem>
            <MenuItem value="monday">Monday</MenuItem>
            <MenuItem value="tuesday">Tuesday</MenuItem>
            <MenuItem value="wednesday">Wednesday</MenuItem>
            <MenuItem value="thursday">Thursday</MenuItem>
            <MenuItem value="friday">Friday</MenuItem>
            <MenuItem value="saturday">Saturday</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Time Pickers Box */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* Starting Time Box */}
        <Box width={"30%"}>
          <Text>Starting Time</Text>
          <TimePicker
            value={
              fetchedData && fetchedData.timeSlot
                ? dayjs(
                    JSON.parse(fetchedData.timeSlot)[0].startTime,
                    "HH:mm:ss"
                  )
                : timeSlot.startTime
                ? dayjs(timeSlot.startTime, "HH:mm:ss")
                : null
            }
            onChange={handleStartTimeChange}
            renderInput={(props) => (
              <TextField {...props} placeholder="Select time" />
            )}
            disabled={!!fetchedData}
            sx={{ backgroundColor: "#fff" }}
          />
        </Box>

        {/* Ending Time Box */}
        <Box width={"30%"}>
          <Text>Ending Time</Text>
          <TimePicker
            value={
              fetchedData && fetchedData.timeSlot
                ? dayjs(JSON.parse(fetchedData.timeSlot)[0].endTime, "HH:mm:ss")
                : timeSlot.endTime
                ? dayjs(timeSlot.endTime, "HH:mm:ss")
                : null
            }
            onChange={handleEndTimeChange}
            renderInput={(props) => (
              <TextField {...props} placeholder="Select time" />
            )}
            disabled={!!fetchedData}
            sx={{ backgroundColor: "#fff" }}
          />
        </Box>
      </LocalizationProvider>
    </Box>
  );
}

export default TimeSlot;
