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

interface IQualification {
  startDate?: string;
  endDate?: string;
  degree?: string;
  university?: string;
}
interface IQualificationProps {
  qualification: IQualification;
  onQualificationChange: (qualification: IQualification) => void;
}

function Qualification({
  qualification,
  onQualificationChange,
}: IQualificationProps) {
  const handleFieldChange = (field, value) => {
    onQualificationChange({ ...qualification, [field]: value });
  };

  const handleDateChange = (field, date) => {
    handleFieldChange(field, date ? date.format("YYYY-MM-DD") : "");
  };

  return (
    <Box sx={{ display: "flex", width: "100%", gap: "1rem" }}>
      <Box>
        <Text>Starting Date</Text>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={qualification.startDate}
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
            value={qualification.endDate}
            onChange={(newDate) => handleDateChange("endDate", newDate)}
            renderInput={(params) => <TitleTextField {...params} />}
            sx={{ backgroundColor: "#fff" }}
          />
        </LocalizationProvider>
      </Box>

      <Box>
        <Text>Degree</Text>
        <TitleTextField
          required
          value={qualification.degree || ""}
          id="degree"
          label="required"
          fullWidth
          onChange={(e) => handleFieldChange("degree", e.target.value)}
        />
      </Box>
      <Box>
        <Text>University</Text>
        <TitleTextField
          required
          value={qualification.university || ""}
          id="university"
          label="required"
          fullWidth
          onChange={(e) => handleFieldChange("university", e.target.value)}
        />
      </Box>
    </Box>
  );
}

export default Qualification;
