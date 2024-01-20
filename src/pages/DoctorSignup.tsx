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
import { useNavigate } from "react-router-dom";

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
  const [bio, setBio] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

 

  return (
    <MainContainer>
      <Box></Box>
      <Info>
        <ProfileTitle>Profile Information</ProfileTitle>
        <form action="">
          {/* <NameBox> */}
          <TitleTextField
            required
            value={name}
            id="name"
            label="Name"
            defaultValue=""
            fullWidth
            onChange={(e) => setName(e.target.value)}
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
            defaultValue=""
            fullWidth
            onChange={(e) => setPhone(e.target.value)}
          />

          <TitleTextField
            required
            value={bio}
            id="bio"
            label="Bio"
            defaultValue=""
            fullWidth
            onChange={(e) => setBio(e.target.value)}
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

          {/* Qualification */}
          <Box>
            <ColorButton variant="contained">Add Qualification</ColorButton>
            <Qualification />
          </Box>

          {/* Experience */}
          <Box>
            <ColorButton variant="contained">Add Experience</ColorButton>
            <Experiences />
          </Box>

          {/* TimeSlot */}
          <Box>
            <ColorButton variant="contained">Add TimeSlot</ColorButton>
            <TimeSlot />
          </Box>
          <Typography sx={{ fontSize: "0.9rem" }}>About</Typography>
          <TextField fullWidth></TextField>

          <button type="submit">Submit</button>
        </form>
      </Info>
    </MainContainer>
  );
}

export default DoctorSignup;
