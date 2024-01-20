import { Box, TextField, Typography, styled } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const TitleTextField = styled(TextField)(() => ({
  marginBottom: "1.5rem",
  display: "block",
}));

const Text = styled(Typography)(() => ({
  margin: "1.5rem 0 0.5rem 0",
  fontSize: "0.9rem",
}));

function Qualification() {
  return (
    <Box sx={{ display: "flex", width: "100%", gap: "1rem" }}>
      <Box>
        <Text>Starting Date</Text>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider>
      </Box>
      <Box>
        <Text>Ending Date</Text>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider>
      </Box>

      <Box>
        <Text>Degree</Text>
        <TitleTextField
          required
          // value={price}
          id="degree"
          label="required"
          fullWidth
          // onChange={(e) => setPrice(e.target.value)}
        />
      </Box>
      <Box>
        <Text>University</Text>
        <TitleTextField
          required
          // value={price}
          id="university"
          label="required"
          fullWidth
          // onChange={(e) => setPrice(e.target.value)}
        />
      </Box>
    </Box>
  );
}

export default Qualification;
