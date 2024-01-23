import { Box, TextField, Typography, styled } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
}

function Experiences({ experience, onExperienceChange }: IExperienceProps) {
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
            value={experience.startDate}
            onChange={(newDate) => handleDateChange("startDate", newDate)}
            renderInput={(params) => <TitleTextField {...params} />}
            sx={{ backgroundColor: "#fff" }}
          />
        </LocalizationProvider>
      </Box>
      <Box>
        <Text>Ending Date</Text>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={experience.endDate}
            onChange={(newDate) => handleDateChange("endDate", newDate)}
            renderInput={(params) => <TitleTextField {...params} />}
            sx={{ backgroundColor: "#fff" }}
          />
        </LocalizationProvider>
      </Box>
      <Box>
        <Text>Position</Text>
        <TitleTextField
          required
          value={experience.position || ""}
          id="position"
          label="Position"
          fullWidth
          onChange={(e) => handleFieldChange("position", e.target.value)}
        />
      </Box>
      <Box>
        <Text>Hospital</Text>
        <TitleTextField
          required
          value={experience.hospital || ""}
          id="hospital"
          label="Hospital"
          fullWidth
          onChange={(e) => handleFieldChange("hospital", e.target.value)}
        />
      </Box>
    </Box>
  );
}

export default Experiences;
