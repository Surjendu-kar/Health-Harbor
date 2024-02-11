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
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

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

function TimeSlot({
  slot,
  onTimeSlotChange,
  fetchedData,
}: {
  fetchedData: DoctorInfo | null;
}) {
  const [timeSlot, setTimeSlot] = useState(slot || createTimeSlot());
  const [isComplete, setIsComplete] = useState(false);

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
    onTimeSlotChange(timeSlot);
  }, [timeSlot, onTimeSlotChange]);
  // useEffect(() => {
  //   onTimeSlotChange(timeSlot);
  // }, [timeSlot]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Text>Day</Text>
        <Text>Starting Time</Text>
        <Text>Ending Time</Text>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: "1rem",
          width: "100%",
        }}
      >
        <FormControl sx={{ flex: 1, minWidth: 120 }}>
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
            sx={{ backgroundColor: "#fff", width: "100%" }}
            // disabled={timeSlot}
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

        {/* Starting Time Picker */}
        <Box sx={{ flex: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              // Example of adjusting the TimePicker value assignment
              value={
                fetchedData && fetchedData.timeSlot
                  ? dayjs(
                      JSON.parse(fetchedData.timeSlot)[0].startTime,
                      "HH:mm:ss"
                    ).isValid()
                    ? dayjs(
                        JSON.parse(fetchedData.timeSlot)[0].startTime,
                        "HH:mm:ss"
                      )
                    : null
                  : timeSlot.startTime &&
                    dayjs(timeSlot.startTime, "HH:mm:ss").isValid()
                  ? dayjs(timeSlot.startTime, "HH:mm:ss")
                  : null
              }
              onChange={handleStartTimeChange}
              renderInput={(props) => (
                <TextField {...props} placeholder="Select time" />
              )}
              // disabled={timeSlot}
              sx={{ backgroundColor: "#fff", width: "100%" }}
            />
          </LocalizationProvider>
        </Box>

        {/* Ending Time Picker */}
        <Box sx={{ flex: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              // Example of adjusting the TimePicker value assignment
              value={
                fetchedData && fetchedData.timeSlot
                  ? dayjs(
                      JSON.parse(fetchedData.timeSlot)[0].endTime,
                      "HH:mm:ss"
                    ).isValid()
                    ? dayjs(
                        JSON.parse(fetchedData.timeSlot)[0].endTime,
                        "HH:mm:ss"
                      )
                    : null
                  : timeSlot.endTime &&
                    dayjs(timeSlot.endTime, "HH:mm:ss").isValid()
                  ? dayjs(timeSlot.endTime, "HH:mm:ss")
                  : null
              }
              onChange={handleEndTimeChange}
              renderInput={(props) => (
                <TextField {...props} placeholder="Select time" />
              )}
              // disabled={timeSlot}
              sx={{ backgroundColor: "#fff", width: "100%" }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </Box>
  );
}

export default TimeSlot;
