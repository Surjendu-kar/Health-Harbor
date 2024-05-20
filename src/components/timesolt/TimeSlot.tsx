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
import { useTheme } from "@mui/material/styles";
dayjs.extend(customParseFormat);

const MainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  gap: theme.spacing(1),
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  textAlign: "right",
  fontSize: "0.9rem",
  margin: "1.5rem 0 0.5rem 0",
  color: theme.palette.mode === "dark" ? "grey" : "grey.600",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
    margin: "1rem 0 0.3rem 0",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.65rem",
    margin: "0.8rem 0 0.2rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.55rem",
    margin: "0",
  },
}));

const FormControlStyle = styled(FormControl)(({ theme }) => ({
  // flex: 1,
  width: "100%",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},

  "& .MuiSelect-select": {
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.95rem",
      padding: "15px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.75rem",
      padding: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.65rem",
      padding: "5px",
      paddingLeft: "1rem",
    },
  },
}));

const ResponsiveDatePicker = styled(TimePicker)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
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
  isEditMode,
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
      // console.log(timeSlot);
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
  
  const theme = useTheme();

  return (
    <MainContainer>
      <Box
        sx={{
          width: "30%",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
        }}
      >
        <Text color={isEditMode ? "inherit" : "grey.600"}>Day</Text>

        <FormControlStyle>
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
            disabled={!isEditMode}
          >
            <MenuItem value="sunday">Sunday</MenuItem>
            <MenuItem value="monday">Monday</MenuItem>
            <MenuItem value="tuesday">Tuesday</MenuItem>
            <MenuItem value="wednesday">Wednesday</MenuItem>
            <MenuItem value="thursday">Thursday</MenuItem>
            <MenuItem value="friday">Friday</MenuItem>
            <MenuItem value="saturday">Saturday</MenuItem>
          </Select>
        </FormControlStyle>
      </Box>

      {/* Starting Time Picker */}
      <Box>
        <Text color={isEditMode ? "inherit" : "grey.600"}>Starting Time</Text>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ResponsiveDatePicker
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
            disabled={!isEditMode}
            sx={{ backgroundColor: "#fff", width: "100%" }}
          />
        </LocalizationProvider>
      </Box>

      {/* Ending Time Picker */}
      <Box>
        <Text color={isEditMode ? "inherit" : "grey.600"}>Ending Time</Text>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ResponsiveDatePicker
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
            disabled={!isEditMode}
            sx={{ backgroundColor: "#fff", width: "100%" }}
          />
        </LocalizationProvider>
      </Box>
    </MainContainer>
  );
}

export default TimeSlot;
