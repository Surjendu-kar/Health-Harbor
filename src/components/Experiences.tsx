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

function Experiences() {
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
        <Text>Position</Text>
        <TitleTextField
          required
          // value={price}
          id="position"
          label="required"
          fullWidth
          // onChange={(e) => setPrice(e.target.value)}
        />
      </Box>
      <Box>
        <Text>Hospital</Text>
        <TitleTextField
          required
          // value={price}
          id="hospital"
          label="required"
          fullWidth
          // onChange={(e) => setPrice(e.target.value)}
        />
      </Box>
    </Box>
  );
}

export default Experiences;
