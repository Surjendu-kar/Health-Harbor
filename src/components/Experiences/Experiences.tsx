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
  [theme.breakpoints.down("md")]: {},
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

function Experiences({
  experience,
  onExperienceChange,
  fetchedData,
  isEditMode,
}: IExperienceProps) {
  const handleFieldChange = (field: keyof IExperience, value: string) => {
    onExperienceChange({ ...experience, [field]: value });
  };

  const handleDateChange = (field: keyof IExperience, date: Dayjs | null) => {
    handleFieldChange(field, date ? date.format("YYYY-MM-DD") : "");
  };

  return (
    <MainContainer>
      <Box>
        <Text color={isEditMode ? "inherit" : "grey.600"}>Starting Date</Text>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ResponsiveDatePicker
            value={
              fetchedData && fetchedData.experiences
                ? dayjs(
                    JSON.parse(fetchedData.experiences).find(
                      (q) => q.startDate === experience.startDate
                    )?.startDate || ""
                  )
                : experience.startDate
            }
            onChange={(newDate) => handleDateChange("startDate", newDate)}
            renderInput={(params) => <TitleTextField {...params} />}
            sx={{ backgroundColor: "#fff" }}
            disabled={!isEditMode}
          />
        </LocalizationProvider>
      </Box>
      <Box>
        <Text color={isEditMode ? "inherit" : "grey.600"}>Ending Date</Text>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ResponsiveDatePicker
            value={
              fetchedData && fetchedData.experiences
                ? dayjs(
                    JSON.parse(fetchedData.experiences).find(
                      (q) => q.endDate === experience.endDate
                    )?.endDate || ""
                  )
                : experience.endDate
            }
            onChange={(newDate) => handleDateChange("endDate", newDate)}
            renderInput={(params) => <TitleTextField {...params} />}
            sx={{ backgroundColor: "#fff" }}
            disabled={!isEditMode}
          />
        </LocalizationProvider>
      </Box>
      <Box>
        <Text color={isEditMode ? "inherit" : "grey.600"}>Position</Text>

        <TitleTextField
          required
          value={
            fetchedData && fetchedData.experiences
              ? JSON.parse(fetchedData.experiences).find(
                  (q) => q.position === experience.position
                )?.position || ""
              : experience.position
          }
          id="position"
          // label="required"
          fullWidth
          onChange={(e) => handleFieldChange("position", e.target.value)}
          disabled={!isEditMode}
        />
      </Box>
      <Box>
        <Text color={isEditMode ? "inherit" : "grey.600"}>Hospital</Text>

        <TitleTextField
          required
          value={
            fetchedData && fetchedData.experiences
              ? JSON.parse(fetchedData.experiences).find(
                  (q) => q.hospital === experience.hospital
                )?.hospital || ""
              : experience.hospital
          }
          id="hospital"
          // label="required"
          fullWidth
          onChange={(e) => handleFieldChange("hospital", e.target.value)}
          disabled={!isEditMode}
        />
      </Box>
    </MainContainer>
  );
}

export default Experiences;
