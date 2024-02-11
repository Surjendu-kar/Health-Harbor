// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, TextField, Typography, styled } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const TitleTextField = styled(TextField)(() => ({
  marginBottom: "1.5rem",
  display: "block",
  backgroundColor: "#fff",
}));

const TextContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  gap: "1rem",
  margin: "1.5rem 0 0.5rem 0",

  [theme.breakpoints.down("lg")]: {
    margin: "1rem 0 0.3rem 0",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0.8rem 0 0.2rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0.6rem 0 0.1rem 0",
  },
}));
const Text = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.55rem",
  },
}));
interface IExperience {
  startDate?: string;
  endDate?: string;
  position?: string;
  hospital?: string;
}

interface IExperienceProps {
  experience: IExperience;
  onExperienceChange: (experience: IExperience) => void;
  fetchedData: DoctorInfo | null;
}
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

function Experiences({
  experience,
  onExperienceChange,
  fetchedData,
}: IExperienceProps) {
  const handleFieldChange = (field: keyof IExperience, value: string) => {
    onExperienceChange({ ...experience, [field]: value });
  };

  const handleDateChange = (field: keyof IExperience, date: Dayjs | null) => {
    handleFieldChange(field, date ? date.format("YYYY-MM-DD") : "");
  };

  return (
    <Box>
      <TextContainer>
        <Text>Starting Date</Text>
        <Text>Ending Date</Text>
        <Text>Position</Text>
        <Text>Hospital</Text>
      </TextContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: "1rem",
        }}
      >
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={
                fetchedData && fetchedData.experiences
                  ? dayjs(JSON.parse(fetchedData.experiences)[0].startDate)
                  : experience.startDate
              }
              onChange={(newDate) => handleDateChange("startDate", newDate)}
              renderInput={(params) => <TitleTextField {...params} />}
              sx={{ backgroundColor: "#fff" }}
              disabled={!!fetchedData}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={
                fetchedData && fetchedData.experiences
                  ? dayjs(JSON.parse(fetchedData.experiences)[0].endDate)
                  : experience.endDate
              }
              onChange={(newDate) => handleDateChange("endDate", newDate)}
              renderInput={(params) => <TitleTextField {...params} />}
              sx={{ backgroundColor: "#fff" }}
              disabled={!!fetchedData}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <TitleTextField
            required
            value={
              fetchedData && fetchedData.experiences
                ? JSON.parse(fetchedData.experiences)[0].position
                : experience.position
            }
            id="position"
            // label="required"
            fullWidth
            onChange={(e) => handleFieldChange("position", e.target.value)}
            disabled={!!fetchedData}
          />
        </Box>
        <Box>
          <TitleTextField
            required
            value={
              fetchedData && fetchedData.experiences
                ? JSON.parse(fetchedData.experiences)[0].hospital
                : experience.hospital
            }
            id="hospital"
            // label="required"
            fullWidth
            onChange={(e) => handleFieldChange("hospital", e.target.value)}
            disabled={!!fetchedData}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Experiences;
