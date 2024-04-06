import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/system";
import React from "react";
import LocationFields from "../../../../components/locationFields/LocationFields";
import { ToastContainer, toast } from "react-toastify";

const MainContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  margin: "2rem 0",
  [theme.breakpoints.down("lg")]: {
    margin: "0",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0",
  },
}));

const ProfileTitleContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));
const ProfileTitle = styled("h1")(({ theme }) => ({
  margin: 0,
  padding: 0,
  fontSize: "1.5rem",
  [theme.breakpoints.down("lg")]: { fontSize: "1.15rem" },
  [theme.breakpoints.down("md")]: { fontSize: "0.9rem" },
  [theme.breakpoints.down("sm")]: { fontSize: "0.85rem" },
}));
const EditBtn = styled(Button)(({ theme }) => ({
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
  [theme.breakpoints.down("lg")]: {
    minWidth: "48px",
    height: "28px",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "30px",
    height: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "12px",
    height: "12px",
  },
}));

const TitleTextField = styled(TextField)(({ theme }) => ({
  marginTop: "1.5rem",
  display: "block",
  backgroundColor: "#fff",

  [theme.breakpoints.down("lg")]: {
    marginTop: "1rem",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0.7rem",
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

const SelectOption = styled(Box)(({ theme }) => ({
  display: "flex",
  marginTop: "1.5rem",
  gap: 10,
  [theme.breakpoints.down("lg")]: {
    marginTop: "1rem",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0.7rem",
    flexWrap: "wrap",
  },
}));
const ResponsiveSelect = styled(Select)(({ theme }) => ({
  "& .MuiSelect-select": {
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.95rem",
      padding: "15px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.75rem",
      padding: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.65rem",
      padding: "5px",
      paddingLeft: "1rem",
    },
  },
}));

const AboutTextField = styled(TitleTextField)(({ theme }) => ({
  marginTop: "0rem",

  [theme.breakpoints.down("lg")]: {
    marginTop: "0rem",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "0rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0rem",
  },
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  fontSize: "1rem",
  boxShadow: "1px 4px 8px rgba(0, 0, 0, 0.3)",
  marginTop: "1.5rem",

  // color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#6a79ff",
  "&:hover": {
    backgroundColor: "#5162ff",
  },
  [theme.breakpoints.down("lg")]: {
    marginTop: "1rem",
    fontSize: "0.7rem",
    padding: "8px 15px",
  },

  [theme.breakpoints.down("md")]: {
    marginTop: "0.9rem",
    fontSize: "0.6rem",
    padding: "6px 15px",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0.8rem",
    fontSize: "0.5rem",
    padding: "4px 10px",
  },
}));

function PatientInfo({ user, fetchedData }) {
  return (
    <>
      <ToastContainer />
      <MainContainer>
        {/* patient profile -- <b>currently in development phase.</b> */}
        <ProfileTitleContainer>
          <ProfileTitle>Patient Information</ProfileTitle>
          {/* {fetchedData && (
            <EditBtn
            onClick={toggleEditMode}
            >
               {isEditMode ? <Check /> : <Edit />} 
            </EditBtn>
          )} */}
        </ProfileTitleContainer>
        <form action="">
          <TitleTextField
            required
            // value={name}
            id="name"
            label="Name"
            // onChange={(e) => setName(e.target.value)}
            fullWidth
            // disabled={!!fetchedData}
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
            // value={phone}
            id="phone"
            label="Phone"
            // onChange={handlePhoneChange}
            fullWidth
            // disabled={!!fetchedData}
            // disabled={!isEditMode}
          />

          {/* {phoneError && (
          <Typography variant="inherit" sx={{ color: "red" }}>
            {phoneError}
          </Typography>
        )} */}

          <SelectOption>
            <FormControl
              fullWidth
              // disabled={!!fetchedData}
              // disabled={!isEditMode}
            >
              <InputLabel id="demo-simple-select-label">Gender*</InputLabel>
              <ResponsiveSelect
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={gender}
                label="gender"
                // onChange={(e) => setGender(e.target.value)}
                sx={{ backgroundColor: "#fff" }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </ResponsiveSelect>
            </FormControl>

            <FormControl
              fullWidth
              // disabled={!!fetchedData}
              // disabled={!isEditMode}
            >
              <InputLabel id="demo-simple-select-label">
                Specialization*
              </InputLabel>
              <ResponsiveSelect
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={specialization}
                label="specialization"
                // onChange={(e) => setSpecialization(e.target.value)}
                sx={{ backgroundColor: "#fff" }}
                // disabled={!!fetchedData}
              >
                <MenuItem value="cardiology">Cardiology</MenuItem>
                <MenuItem value="dentist">Dentist</MenuItem>
                <MenuItem value="specialized">Specialized</MenuItem>
                <MenuItem value="urology">Urology</MenuItem>
                <MenuItem value="neurology">Neurology</MenuItem>
                <MenuItem value="orthopedic">Orthopedic</MenuItem>
                <MenuItem value="stomach">Stomach</MenuItem>
              </ResponsiveSelect>
            </FormControl>
          </SelectOption>

          <LocationFields
            isEditMode={true}
            // setAddress={setAddress}
            // setCity={setCity}
            // address={address}
            // city={city}
          />

          <Box>
            <ColorButton
              variant="contained"
              // disabled={!isEditMode}
              sx={{ margin: "1.5rem 0 0.5rem 0.1rem" }}
            >
              About Problem
            </ColorButton>
            <AboutTextField
              fullWidth
              // onChange={(e) => setAbout(e.target.value)}
              sx={{ backgroundColor: "#fff" }}
              // value={about}
              // disabled={!!fetchedData}
              // disabled={!isEditMode}
            />
            <Box sx={{ textAlign: "right" }}>
              <ColorButton
                type="submit"
                variant="contained"
                color="primary"
                // disabled={isEditMode || !isFormValid || isLoading}
                // disabled={!isEditMode || !isFormValid}
                // disabled={fetchedData && isEditMode}
                onClick={() =>
                  toast.warning(" currently in development phase.")
                }
              >
                Submit
              </ColorButton>
            </Box>
          </Box>
        </form>
      </MainContainer>
    </>
  );
}

export default PatientInfo;
