import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { ButtonProps } from "@mui/material/Button";
import Qualification from "../../../components/qualification/Qualification";
import Experiences from "../../../components/Experiences/Experiences";
import TimeSlot from "../../../components/timesolt/TimeSlot";
import InsertData from "../../../supabase/InsertData";
import { User } from "@supabase/supabase-js";
import { Edit, Check } from "@mui/icons-material";

const ProfileTitle = styled("h1")(() => ({
  margin: 0,
  padding: 0,
  // marginBottom: "2rem",
  fontSize: "1.5rem",
}));

const ProfileTitleContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const MainContainer = styled(Box)(() => ({
  width: "50%",
  margin: "2rem 0",
}));

const TitleTextField = styled(TextField)(() => ({
  marginTop: "1.5rem",
  display: "block",
  backgroundColor: "#fff",
}));

const SelectOption = styled(Box)(() => ({
  display: "flex",
  marginTop: "1.5rem",
  gap: 10,
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  boxShadow: "1px 4px 8px rgba(0, 0, 0, 0.3)",

  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#6a79ff",
  "&:hover": {
    backgroundColor: "#5162ff",
  },
  marginTop: "1.5rem",
}));

interface IQualification {
  startDate?: string;
  endDate?: string;
  degree?: string;
  university?: string;
}
interface IExperience {
  startDate?: string;
  endDate?: string;
  position?: string;
  hospital?: string;
}
type DoctorInfo = {
  id: number;
  name: string;
  email: string;
  phoneno: string;
  bio: string;
  gender: string;
  specialization: string;
  price: number;
  qualifications: string[];
  experiences: string[];
  timeSlot: string[];
  about: string;
};

function Info({
  user,
  fetchedData,
}: {
  user: User | null;
  fetchedData: DoctorInfo | null;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [bio, setBio] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualifications, setQualifications] = useState<IQualification[]>([]);
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [about, setAbout] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    checkFormValidity();
  }, [phone, qualifications, experiences, timeSlots]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const isValidPhone = /^\d{10}$/.test(value);
    setPhoneError(isValidPhone ? "" : "Phone number must be 10 digits");
    setPhone(value);
  };

  const checkFormValidity = () => {
    const isValid =
      phoneError === "" &&
      phone.length === 10 &&
      qualifications.length > 0 &&
      experiences.length > 0 &&
      timeSlots !== null;
    setIsFormValid(isValid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    const newDoctor = {
      name: name,
      email: user?.email,
      phoneno: phone,
      bio: bio,
      gender: gender,
      specialization: specialization,
      price: price,
      qualifications: JSON.stringify(qualifications),
      experiences: JSON.stringify(experiences),
      timeSlot: timeSlots,
      about: about,
    };
    console.log(newDoctor);

    InsertData(newDoctor); // Insert data to the database
  };

  // use to open Qualification
  const handleAddQualification = () => {
    setQualifications([...qualifications, {}]);
  };

  const handleQualificationChange = (
    index: number,
    qualificationData: IQualification
  ) => {
    const newQualifications = [...qualifications];
    newQualifications[index] = qualificationData;
    setQualifications(newQualifications);
  };

  // use to open Experience
  const handleAddExperience = () => {
    setExperiences([...experiences, {}]);
  };

  const handleExperienceChange = (
    index: number,
    experienceData: IExperience
  ) => {
    const newExperiences = [...experiences];
    newExperiences[index] = experienceData;
    setExperiences(newExperiences);
  };

  // handle qualifications,experiences,timeSlot

  useEffect(() => {
    if (fetchedData) {
      if (fetchedData.qualifications) {
        setQualifications(JSON.parse(fetchedData.qualifications));
      }
      if (fetchedData.experiences) {
        setExperiences(JSON.parse(fetchedData.experiences));
      }
      if (fetchedData.timeSlot) {
        const parsedTimeSlots = JSON.parse(fetchedData.timeSlot);
        setTimeSlots(parsedTimeSlots);
      }
    }
  }, [fetchedData]);

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { day: "", startTime: null, endTime: null }]);
  };

  const handleTimeSlotChange = (index, updatedSlot) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index] = updatedSlot;
    setTimeSlots(newTimeSlots);
  };

  

  useEffect(() => {
    if (fetchedData) {
      setQualifications([...qualifications, {}]);
      setExperiences([...experiences, {}]);
    }
  }, []);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      // Here, you can implement the logic to handle the submission of edited details
      // For example, you could call an update function to save the edited details to the database
    }
  };

  return (
    <MainContainer>
      <ProfileTitleContainer>
        <ProfileTitle>Profile Information</ProfileTitle>
        {fetchedData && (
          <Button
            onClick={toggleEditMode}
            sx={{
              color: "#1D2B53",
              background: "#80808014",
              borderRadius: "10px",
              transition: "transform 0.3s ease",
              ":hover": {
                transform: "scale(1.15)",
              },
              "& .MuiButton-startIcon": {
                transition: "transform 0.3s ease",
                ":hover": {
                  transform: "scale(1.2)",
                },
              },
            }}
          >
            {isEditMode ? <Check /> : <Edit />}
          </Button>
        )}
      </ProfileTitleContainer>

      <form onSubmit={handleSubmit}>
        <TitleTextField
          required
          value={fetchedData ? fetchedData.name : name}
          id="name"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          fullWidth
          disabled={!!fetchedData}
          // disabled={!isEditMode}
        />
        {user && (
          <TitleTextField
            id="email"
            label="Email*"
            defaultValue={user.email}
            InputProps={{
              readOnly: true,
            }}
            disabled
            fullWidth
          />
        )}
        <TitleTextField
          required
          value={fetchedData ? fetchedData.phoneno : phone}
          id="phone"
          label="Phone"
          onChange={handlePhoneChange}
          fullWidth
          disabled={!!fetchedData}
          // disabled={!isEditMode}
        />
        {phoneError && (
          <Typography variant="inherit" sx={{ color: "red" }}>
            {phoneError}
          </Typography>
        )}
        <TitleTextField
          required
          value={fetchedData ? fetchedData.bio : bio}
          id="bio"
          label="Bio"
          onChange={(e) => setBio(e.target.value)}
          fullWidth
          disabled={!!fetchedData}
          // disabled={!isEditMode}
        />

        <SelectOption>
          <FormControl
            fullWidth
            disabled={!!fetchedData}
            // disabled={!isEditMode}
          >
            <InputLabel id="demo-simple-select-label">Gender*</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fetchedData ? fetchedData.gender : gender}
              label="gender"
              onChange={(e) => setGender(e.target.value)}
              sx={{ backgroundColor: "#fff" }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            disabled={!!fetchedData}
            // disabled={!isEditMode}
          >
            <InputLabel id="demo-simple-select-label">
              Specialization*
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fetchedData ? fetchedData.specialization : specialization}
              label="specialization"
              onChange={(e) => setSpecialization(e.target.value)}
              sx={{ backgroundColor: "#fff" }}
              disabled={!!fetchedData}
            >
              <MenuItem value="cardiology">Cardiology</MenuItem>
              <MenuItem value="dentist">Dentist</MenuItem>
              <MenuItem value="specialized">Specialized</MenuItem>
              <MenuItem value="urology">Urology</MenuItem>
              <MenuItem value="neurology">Neurology</MenuItem>
              <MenuItem value="orthopedic">Orthopedic</MenuItem>
              <MenuItem value="stomach">Stomach</MenuItem>
            </Select>
          </FormControl>

          <TitleTextField
            required
            value={fetchedData ? fetchedData.price : price}
            id="price"
            label="Ticket Price"
            fullWidth
            onChange={(e) => setPrice(e.target.value)}
            sx={{ marginTop: 0 }}
            disabled={!!fetchedData}
            // disabled={!isEditMode}
          />
        </SelectOption>
        {/* </NameBox> */}

        {/* Qualification Section */}
        <Box>
          <ColorButton onClick={handleAddQualification} variant="contained">
            Add Qualification
          </ColorButton>
          {qualifications.map((qualification, index) => (
            <Qualification
              key={index}
              qualification={qualification}
              onQualificationChange={(qualificationData) =>
                handleQualificationChange(index, qualificationData)
              }
              fetchedData={fetchedData} 
            />
          ))}
        </Box>

        {/* Experience Section */}
        <Box>
          <ColorButton onClick={handleAddExperience} variant="contained">
            Add Experience
          </ColorButton>
          {experiences.map((experience, index) => (
            <Experiences
              key={index}
              experience={experience}
              onExperienceChange={(updatedExperience) =>
                handleExperienceChange(index, updatedExperience)
              }
              fetchedData={fetchedData} // Explicitly passing null if no fetchedData
            />
          ))}
        </Box>

        {/* TimeSlot Section */}
        <Box>
          <ColorButton onClick={handleAddTimeSlot} variant="contained">
            Add TimeSlot
          </ColorButton>
          {timeSlots.map((slot, index) => (
            <TimeSlot
              key={index} // Here, ensure you have a proper key. Index as a key is not recommended for dynamic lists.
              slot={slot}
              onTimeSlotChange={(updatedSlot) =>
                handleTimeSlotChange(index, updatedSlot)
              }
            />
          ))}
        </Box>

        <Typography sx={{ fontSize: "0.9rem", marginTop: "1rem" }}>
          About
        </Typography>
        <TextField
          fullWidth
          onChange={(e) => setAbout(e.target.value)}
          sx={{ backgroundColor: "#fff" }}
          value={fetchedData ? fetchedData.about : about}
          disabled={!!fetchedData}
          // disabled={!isEditMode}
        ></TextField>

        <ColorButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid}
          // disabled={!isEditMode || !isFormValid}
        >
          Submit
        </ColorButton>
      </form>
    </MainContainer>
  );
}

export default Info;
