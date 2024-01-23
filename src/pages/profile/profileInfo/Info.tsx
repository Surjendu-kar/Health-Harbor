import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
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
import { supabase } from "../../../supabase/config";
import Qualification from "../../../components/qualification/Qualification";
import Experiences from "../../../components/Experiences/Experiences";
import TimeSlot from "../../../components/timesolt/TimeSlot";

const ProfileTitle = styled("h1")(() => ({
  margin: 0,
  padding: 0,
  marginBottom: "2rem",
  fontSize: "1.5rem",
}));

const MainContainer = styled(Box)(() => ({
  width: "50%",
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

function Info() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [bio, setBio] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualifications, setQualifications] = useState<IQualification[]>([]);
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [timeSlot, setTimeSlot] = useState(null);
  const [about, setAbout] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  useEffect(() => {
    checkFormValidity();
  }, [phone, qualifications, experiences, timeSlot]);

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
      timeSlot !== null;
    setIsFormValid(isValid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Bio:", bio);
    console.log("Price:", price);
    console.log("Gender:", gender);
    console.log("Specialization:", specialization);
    console.log("Qualifications:", qualifications);
    console.log("Experiences:", experiences);
    console.log("TimeSlot:", timeSlot);
  };
  // Handler for adding a new qualification
  const handleAddQualification = () => {
    setQualifications([...qualifications, {}]); // Update with a new default qualification object
  };

  const handleQualificationChange = (
    index: number,
    qualificationData: IQualification
  ) => {
    const newQualifications = [...qualifications];
    newQualifications[index] = qualificationData;
    setQualifications(newQualifications);
  };

  // Handler for adding a new experience
  const handleAddExperience = () => {
    setExperiences([...experiences, {}]); // Update with a new default experience object
  };

  const handleExperienceChange = (
    index: number,
    experienceData: IExperience
  ) => {
    const newExperiences = [...experiences];
    newExperiences[index] = experienceData;
    setExperiences(newExperiences);
  };

  // Handler for setting a new time slot
  const handleSetTimeSlot = () => {
    if (!timeSlot) {
      setTimeSlot({}); // Set a default time slot structure
    }
  };
  return (
    <MainContainer>
      <ProfileTitle>Profile Information</ProfileTitle>
      <form onSubmit={handleSubmit}>
        <TitleTextField
          required
          value={name}
          id="name"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          fullWidth
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
          value={phone}
          id="phone"
          label="Phone"
          onChange={handlePhoneChange}
          fullWidth
        />
        {phoneError && (
          <Typography variant="inherit" sx={{ color: "red" }}>
            {phoneError}
          </Typography>
        )}
        <TitleTextField
          required
          value={bio}
          id="bio"
          label="Bio"
          onChange={(e) => setBio(e.target.value)}
          fullWidth
        />

        <SelectOption>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender*</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="gender"
              onChange={(e) => setGender(e.target.value)}
              sx={{ backgroundColor: "#fff" }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Specialization*
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={specialization}
              label="specialization"
              onChange={(e) => setSpecialization(e.target.value)}
              sx={{ backgroundColor: "#fff" }}
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
            value={price}
            id="price"
            label="Ticket Price"
            fullWidth
            onChange={(e) => setPrice(e.target.value)}
            sx={{ marginTop: 0 }}
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
              onExperienceChange={(experienceData) =>
                handleExperienceChange(index, experienceData)
              }
            />
          ))}
        </Box>

        {/* TimeSlot Section */}
        <Box>
          <ColorButton onClick={handleSetTimeSlot} variant="contained">
            Set TimeSlot
          </ColorButton>
          {timeSlot && <TimeSlot />}
        </Box>

        <Typography sx={{ fontSize: "0.9rem", marginTop: "1rem" }}>
          About
        </Typography>
        <TextField
          fullWidth
          onChange={(e) => setAbout(e.target.value)}
          sx={{ backgroundColor: "#fff" }}
        ></TextField>

        <ColorButton
          type="submit"
          variant="contained"
          color="primary"
          // disabled={!isFormValid}
        >
          Submit
        </ColorButton>
      </form>
    </MainContainer>
  );
}

export default Info;
