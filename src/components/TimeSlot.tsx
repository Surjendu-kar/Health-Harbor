import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";

const Text = styled(Typography)(() => ({
  margin: "1.5rem 0 0.5rem 0",
  fontSize: "0.9rem",
}));

function TimeSlot() {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs());

  const handleStartTimeChange = (newValue: Dayjs | null) => {
    if (newValue !== null) {
      setStartTime(newValue);
    }
  };

  const handleEndTimeChange = (newValue: Dayjs | null) => {
    if (newValue !== null) {
      setEndTime(newValue);
    }
  };

  useEffect(() => {
    console.log(day, startTime, endTime);
  }, [day, startTime, endTime]);
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
            value={day}
            onChange={(e) => setDay(e.target.value)}
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
            value={startTime}
            onChange={handleStartTimeChange}
            renderInput={(props) => <TextField {...props} />}
          />
        </Box>

        {/* Ending Time Box */}
        <Box width={"30%"}>
          <Text>Ending Time</Text>
          <TimePicker
            value={endTime}
            onChange={handleEndTimeChange}
            renderInput={(props) => <TextField {...props} />}
          />
        </Box>
      </LocalizationProvider>
    </Box>
  );
}

export default TimeSlot;
