import { useEffect, useState } from "react";
import { supabase } from "../supabase/config";
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
import Qualification from "../components/Qualification";
import Experiences from "../components/Experiences";
import TimeSlot from "../components/TimeSlot";

const ProfileTitle = styled("h1")(() => ({
  margin: 0,
  padding: 0,
  marginBottom: "2rem",
  fontSize: "1.5rem",
}));

const MainContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  marginTop: "2rem",
}));

const Info = styled(Box)(() => ({
  width: "50%",
}));

const TitleTextField = styled(TextField)(() => ({
  marginBottom: "1.5rem",
  display: "block",
}));

const SelectOption = styled(Box)(() => ({
  display: "flex",
  gap: 10,
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function DoctorSignup() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [bio, setBio] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualifications, setQualifications] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [timeSlot, setTimeSlot] = useState(null);
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

  // Handler for adding a new experience
  const handleAddExperience = () => {
    setExperiences([...experiences, {}]); // Update with a new default experience object
  };

  // Handler for setting a new time slot
  const handleSetTimeSlot = () => {
    if (!timeSlot) {
      setTimeSlot({}); // Set a default time slot structure
    }
  };

  return (
    <MainContainer>
      <Info>
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
          {phoneError && <div style={{ color: "red" }}>{phoneError}</div>}
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
            />
          </SelectOption>
          {/* </NameBox> */}
          {/* Qualification Section */}
          <Box>
            <ColorButton
              onClick={handleAddQualification}
              variant="contained"
              sx={{ mb: 2 }}
            >
              Add Qualification
            </ColorButton>
            {qualifications.map((qualification, index) => (
              <Qualification key={index} />
            ))}
          </Box>
          {/* Experience Section */}
          <Box>
            <ColorButton
              onClick={handleAddExperience}
              variant="contained"
              sx={{ mb: 2 }}
            >
              Add Experience
            </ColorButton>
            {experiences.map((experience, index) => (
              <Experiences key={index} />
            ))}
          </Box>
          {/* TimeSlot Section */}
          <Box>
            <ColorButton
              onClick={handleSetTimeSlot}
              variant="contained"
              sx={{ mb: 2 }}
            >
              Set TimeSlot
            </ColorButton>
            {timeSlot && <TimeSlot />}
          </Box>

          <Typography sx={{ fontSize: "0.9rem", marginTop: "1rem" }}>
            About
          </Typography>
          <TextField fullWidth></TextField>

          <ColorButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid}
            sx={{ marginTop: "1rem" }}
          >
            Submit
          </ColorButton>
        </form>
      </Info>
    </MainContainer>
  );
}

export default DoctorSignup;
