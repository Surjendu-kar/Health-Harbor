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

interface IQualification {
  startDate?: string;
  endDate?: string;
  degree?: string;
  university?: string;
}
interface IQualificationProps {
  qualification: IQualification;
  onQualificationChange: (qualification: IQualification) => void;
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

function Qualification({
  qualification,
  onQualificationChange,
  fetchedData,
}: IQualificationProps) {
  const handleFieldChange = (field, value) => {
    onQualificationChange({ ...qualification, [field]: value });
  };

  const handleDateChange = (field, date) => {
    handleFieldChange(field, date ? date.format("YYYY-MM-DD") : "");
  };

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
        <Text>Starting Date</Text>
        <Text>Ending Date</Text>
        <Text>Degree</Text>
        <Text>University</Text>
      </Box>

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
                fetchedData && fetchedData.qualifications
                  ? dayjs(JSON.parse(fetchedData.qualifications)[0].startDate)
                  : qualification.startDate
              }
              sx={{ backgroundColor: "#fff" }}
              onChange={(newDate) => handleDateChange("startDate", newDate)}
              renderInput={(params) => <TitleTextField {...params} />}
              disabled={!!fetchedData}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={
                fetchedData && fetchedData.qualifications
                  ? dayjs(JSON.parse(fetchedData.qualifications)[0].endDate)
                  : qualification.endDate
              }
              sx={{ backgroundColor: "#fff" }}
              onChange={(newDate) => handleDateChange("endDate", newDate)}
              renderInput={(params) => <TitleTextField {...params} />}
              disabled={!!fetchedData}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <TitleTextField
            label="required"
            required
            fullWidth
            value={
              fetchedData && fetchedData.qualifications
                ? JSON.parse(fetchedData.qualifications)[0].degree
                : qualification.degree
            }
            onChange={(e) => handleFieldChange("degree", e.target.value)}
            disabled={!!fetchedData}
            sx={{ marginBottom: "1rem" }}
          />
        </Box>
        <Box>
          <TitleTextField
            label="required"
            fullWidth
            required
            value={
              fetchedData && fetchedData.qualifications
                ? JSON.parse(fetchedData.qualifications)[0].university
                : qualification.university
            }
            onChange={(e) => handleFieldChange("university", e.target.value)}
            disabled={!!fetchedData}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Qualification;
