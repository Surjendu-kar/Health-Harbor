// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, TextField, Typography, styled } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const MainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  gap: theme.spacing(1),
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(0.5),
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const TitleTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "1.5rem",
  display: "block",
  backgroundColor: "#fff",

  [theme.breakpoints.down("lg")]: {
    marginBottom: "1rem",
  },
  [theme.breakpoints.down("md")]: {
    marginBottom: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "0.7rem",
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

const ResponsiveDatePicker = styled(DatePicker)(({ theme }) => ({
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
  isEditMode: boolean;
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
  isEditMode,
}: IQualificationProps) {
  const handleFieldChange = (field, value) => {
    onQualificationChange({ ...qualification, [field]: value });
  };

  const handleDateChange = (field, date) => {
    handleFieldChange(field, date ? date.format("YYYY-MM-DD") : "");
  };

  return (
    <MainContainer>
      <Box>
        <Text color={isEditMode ? "inherit" : "grey.600"}>Starting Date</Text>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ResponsiveDatePicker
            value={
              fetchedData && fetchedData.qualifications
                ? dayjs(
                    JSON.parse(fetchedData.qualifications).find(
                      (q) => q.startDate === qualification.startDate
                    )?.startDate || ""
                  )
                : qualification.startDate
            }
            sx={{ backgroundColor: "#fff" }}
            onChange={(newDate) => handleDateChange("startDate", newDate)}
            renderInput={(params) => <TitleTextField {...params} />}
            disabled={!isEditMode}
          />
        </LocalizationProvider>
      </Box>
      <Box>
        <Text color={isEditMode ? "inherit" : "grey.600"}>Ending Date</Text>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ResponsiveDatePicker
            value={
              fetchedData && fetchedData.qualifications
                ? dayjs(
                    JSON.parse(fetchedData.qualifications).find(
                      (q) => q.endDate === qualification.endDate
                    )?.endDate || ""
                  )
                : qualification.endDate
            }
            sx={{ backgroundColor: "#fff" }}
            onChange={(newDate) => handleDateChange("endDate", newDate)}
            renderInput={(params) => <TitleTextField {...params} />}
            disabled={!isEditMode}
          />
        </LocalizationProvider>
      </Box>
      <Box>
        <Text color={isEditMode ? "inherit" : "grey.600"}>Degree</Text>

        <TitleTextField
          label="required"
          required
          fullWidth
          value={
            fetchedData && fetchedData.qualifications
              ? JSON.parse(fetchedData.qualifications).find(
                  (q) => q.degree === qualification.degree
                )?.degree || ""
              : qualification.degree
          }
          onChange={(e) => handleFieldChange("degree", e.target.value)}
          disabled={!isEditMode}
          sx={{ marginBottom: "1rem" }}
        />
      </Box>
      <Box>
        <Text color={isEditMode ? "inherit" : "grey.600"}>University</Text>

        <TitleTextField
          label="required"
          fullWidth
          required
          value={
            fetchedData && fetchedData.qualifications
              ? JSON.parse(fetchedData.qualifications).find(
                  (q) => q.university === qualification.university
                )?.university || ""
              : qualification.university
          }
          onChange={(e) => handleFieldChange("university", e.target.value)}
          disabled={!isEditMode}
        />
      </Box>
    </MainContainer>
  );
}

export default Qualification;
