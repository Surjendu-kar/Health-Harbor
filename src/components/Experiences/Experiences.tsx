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
const Text = styled(Typography)(() => ({
  margin: "1.5rem 0 0.5rem 0",
  fontSize: "0.9rem",
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
    <Box sx={{ display: "flex", width: "100%", gap: "1rem" }}>
      <Box>
        <Text>Starting Date</Text>
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
        <Text>Ending Date</Text>
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
        <Text>Position*</Text>
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
        <Text>Hospital*</Text>
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
  );
}

export default Experiences;
