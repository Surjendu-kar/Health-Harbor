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
import FetchData from "../../../supabase/FetchData";
import { User } from "@supabase/supabase-js";

const ProfileTitle = styled("h1")(() => ({
  margin: 0,
  padding: 0,
  marginBottom: "2rem",
  fontSize: "1.5rem",
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
      qualifications: qualifications,
      experiences: experiences,
      timeSlot: timeSlots,
      about: about,
    };
    console.log(newDoctor);

    InsertData(newDoctor); // Insert data to the database
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

  const createTimeSlot = (day = "", startTime = null, endTime = null) => ({
    day,
    startTime,
    endTime,
  });

  // Handler for setting a new time slot
  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, createTimeSlot()]);
  };

  const handleTimeSlotChange = (index, updatedSlot) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index] = updatedSlot;
    setTimeSlots(newTimeSlots);
  };

  return (
    <MainContainer>
      <ProfileTitle>Profile Information</ProfileTitle>
      <form onSubmit={handleSubmit}>
        <TitleTextField
          required
          value={fetchedData ? fetchedData.name : name}
          id="name"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          fullWidth
          disabled={!!fetchedData}
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
        />

        <SelectOption>
          <FormControl fullWidth disabled={!!fetchedData}>
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

          <FormControl fullWidth disabled={!!fetchedData}>
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
              fetchedData={fetchedData}
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
              fetchedData={fetchedData}
              onExperienceChange={(experienceData) =>
                handleExperienceChange(index, experienceData)
              }
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
              key={index}
              slot={slot}
              fetchedData={fetchedData}
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
        ></TextField>

        <ColorButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid}
        >
          Submit
        </ColorButton>
      </form>
    </MainContainer>
  );
}

export default Info;
