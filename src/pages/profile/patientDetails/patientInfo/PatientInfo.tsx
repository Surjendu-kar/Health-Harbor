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
import { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import LocationFields from "../../../../components/locationFields/LocationFields";
import { ToastContainer, toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { supabase } from "../../../../supabase/config";
import defaultImg from "../../../../assets/Default_pfp-removebg-preview.png";
import dayjs from "dayjs";

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

const ImgBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const Img = styled("img")(({ theme }) => ({
  height: "140px",
  width: "140px",
  borderRadius: "10px",
  transition: "opacity 0.5s ease-in-out, filter 0.5s ease-in-out",
  opacity: 1,
  filter: "blur(0px)",

  [theme.breakpoints.down("lg")]: {
    height: "130px",
    width: "130px",
  },
  [theme.breakpoints.down("md")]: {
    height: "115px",
    width: "115px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "75px",
    width: "75px",
  },
}));

const ImgBtn = styled(Button)(({ theme }) => ({
  letterSpacing: "0.7px",
  padding: "0px 10px",
  fontSize: "0.7rem",
  backgroundColor: "#fff",
  color: "#000",
  ":hover": {
    backgroundColor: "grey",
    color: "#fff",
  },
  // Adjust CloudUploadIcon size based on breakpoints
  "& .MuiSvgIcon-root": {
    // Target the icon inside the button
    fontSize: "1rem", // Default size
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.9rem", // Adjust for large screens
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.6rem", // Adjust for medium screens
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.3rem", // Adjust for small screens
    },
  },
  [theme.breakpoints.down("lg")]: {
    padding: "0px 8px",
    fontSize: "0.6rem",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0",
    fontSize: "0.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0",
    fontSize: "0.2rem",
  },
}));

function PatientInfo({ user }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [allergies, setAllergies] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
  });
  const [insuranceInfo, setInsuranceInfo] = useState({
    provider: "",
    policyNumber: "",
  });
  const [documents, setDocuments] = useState([]);
  const [about, setAbout] = useState("");
  const [isEditMode, setIsEditMode] = useState<boolean>();
  const [imgPath, setImgPath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const requiredFields = [
      name,
      imgPath,
      phone,
      gender,
      dateOfBirth,
      allergies,
      bloodGroup,
      height,
      weight,
      address,
      city,
      emergencyContact.name,
      emergencyContact.relationship,
      emergencyContact.phone,
    ];

    return requiredFields.every((field) => field);
  };

  const handleFileInput = async (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    if (!file) return;

    try {
      const { data, error } = await supabase.storage
        .from("patientImg")
        .upload(`avatar_${Date.now()}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      if (data && data?.fullPath) {
        const fullPath = `https://eraerhfcolqnyopznyyb.supabase.co/storage/v1/object/public/${data.fullPath}`;
        setImgPath(fullPath);
      }

      toast.success("Upload successful");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields.");
      return;
    }
    const patientData = {
      name: name,
      img: imgPath,
      phoneNo: phone,
      gender: gender,
      dateOfBirth: dateOfBirth,
      allergies: allergies,
      bloodGroup: bloodGroup,
      height: height,
      weight: weight,
      address: address,
      city: city,
      emergencyContact: emergencyContact,
      insuranceInfo: insuranceInfo,
      docItem: documents,
      about: about,
    };
    if (user) {
      try {
        const { data, error } = await supabase
          .from("patientInfo")
          .update(patientData)
          .eq("email", user.email)
          .select();

        if (error) {
          console.error("Error updating patientInfo:", error);
          toast.error("Failed to update patient information.");
        } else {
          console.log("PatientInfo updated successfully:", data);
          toast.success("Patient information updated successfully!");
        }
      } catch (error) {
        console.error("Error updating patientInfo:", error);
        toast.error("Failed to update patient information.");
      }
    }
  };

  useEffect(() => {
    const fetchPatientInfo = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("patientInfo")
            .select("*")
            .eq("email", user.email)
            .single();

          if (error) {
            console.error("Error fetching patientInfo:", error);
          } else {
            setName(data.name);
            setPhone(data.phoneNo);
            setGender(data.gender);
            setDateOfBirth(data.dateOfBirth ? dayjs(data.dateOfBirth) : null);
            setAllergies(data.allergies);
            setBloodGroup(data.bloodGroup);
            setHeight(data.height);
            setWeight(data.weight);
            setAddress(data.address);
            setCity(data.city);
            setEmergencyContact(JSON.parse(data.emergencyContact || "[]"));
            setInsuranceInfo(JSON.parse(data.insuranceInfo || "[]"));
            setDocuments(data.documents);
            setAbout(data.about);
            setIsEditMode(!!data.name);
            setImgPath(data.img || null);
          }
        } catch (error) {
          console.error("Error fetching patientInfo:", error);
        }
      }
    };

    fetchPatientInfo();
  }, [user]);

  useEffect(() => {
    if (imgPath) {
      const updateImageInDatabase = async () => {
        try {
          const { data, error } = await supabase
            .from("patientInfo")
            .update({ img: imgPath })
            .eq("email", user?.email);

          if (error) throw error;
          // console.log("Database update successful", data);
        } catch (error) {
          console.error("Error updating data:", error);
        }
      };

      updateImageInDatabase();
    }
  }, [imgPath, user?.email]);

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
        <ImgBox>
          {/* Img */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Img
              src={imgPath ? imgPath : defaultImg}
              alt="profile-image"
              style={{
                opacity: isLoading ? 0.5 : 1,
                filter: isLoading ? "blur(2px)" : "blur(0px)",
              }}
              onLoad={() => setIsLoading(false)}
            />
          </Box>
        </ImgBox>

        <label
          htmlFor="upload-profile-img"
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <input
            type="file"
            name="upload-img"
            id="upload-profile-img"
            style={{ display: "none" }}
            onChange={handleFileInput}
            ref={uploadRef}
          />
          <ImgBtn
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onClick={() => {
              if (uploadRef?.current) {
                uploadRef.current.click();
              }
            }}
          >
            {imgPath ? "Edit" : "Add photo"}
          </ImgBtn>
        </label>

        <form action="">
          <TitleTextField
            required
            value={name}
            id="name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            fullWidth
            disabled={isEditMode}
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
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            disabled={isEditMode}
          />

          <SelectOption>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" required>
                Gender
              </InputLabel>
              <ResponsiveSelect
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="gender"
                onChange={(e) => setGender(e.target.value)}
                sx={{ backgroundColor: "#fff" }}
                disabled={isEditMode}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </ResponsiveSelect>
            </FormControl>

            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ResponsiveDatePicker
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={(newValue) =>
                    setDateOfBirth(newValue.format("YYYY-MM-DD"))
                  }
                  disabled={isEditMode}

                  // renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </SelectOption>

          <SelectOption>
            <FormControl fullWidth>
              <InputLabel id="blood-group-label" required>
                Allergies
              </InputLabel>
              <ResponsiveSelect
                labelId="blood-group-label"
                id="blood-group-select"
                required
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                label="Blood Group"
                disabled={isEditMode}
              >
                <MenuItem value="peanuts">Peanuts</MenuItem>
                <MenuItem value="tree nuts">Tree nuts</MenuItem>
                <MenuItem value="wheat">Wheat</MenuItem>
                <MenuItem value="soy">Soy</MenuItem>
                <MenuItem value="fish">Fish</MenuItem>
                <MenuItem value="shellfish">Shellfish</MenuItem>
                <MenuItem value="eggs">Eggs</MenuItem>
                <MenuItem value="milk">Milk</MenuItem>
                <MenuItem value="others">Others</MenuItem>
                <MenuItem value="na">Not Applicable</MenuItem>
              </ResponsiveSelect>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="blood-group-label" required>
                Blood Group
              </InputLabel>
              <ResponsiveSelect
                labelId="blood-group-label"
                id="blood-group-select"
                required
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                label="Blood Group"
                disabled={isEditMode}
              >
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
              </ResponsiveSelect>
            </FormControl>
          </SelectOption>

          <SelectOption>
            <TitleTextField
              sx={{ marginTop: "0" }}
              required
              fullWidth
              label="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              type="number"
              disabled={isEditMode}
            />
            <TitleTextField
              sx={{ marginTop: "0" }}
              required
              fullWidth
              label="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="number"
              disabled={isEditMode}
            />
          </SelectOption>

          <LocationFields
            isEditMode={!isEditMode}
            setAddress={setAddress}
            setCity={setCity}
            address={address}
            city={city}
          />

          <Box>
            <ColorButton
              variant="contained"
              sx={{ margin: "1.5rem 0 0.5rem 0.1rem" }}
              disabled={isEditMode}
            >
              Emergency Contact
            </ColorButton>
            <TitleTextField
              required
              value={emergencyContact.name}
              id="emergencyName"
              label="Name"
              onChange={(e) =>
                setEmergencyContact({
                  ...emergencyContact,
                  name: e.target.value,
                })
              }
              fullWidth
              disabled={isEditMode}
            />
            <TitleTextField
              required
              value={emergencyContact.relationship}
              id="Relationship"
              label="Relationship"
              onChange={(e) =>
                setEmergencyContact({
                  ...emergencyContact,
                  relationship: e.target.value,
                })
              }
              fullWidth
              disabled={isEditMode}
            />
            <TitleTextField
              required
              value={emergencyContact.phone}
              id="emergencyPhone"
              label="Phone"
              onChange={(e) =>
                setEmergencyContact({
                  ...emergencyContact,
                  phone: e.target.value,
                })
              }
              fullWidth
              disabled={isEditMode}
            />
            <TitleTextField
              value={emergencyContact.email}
              id="emergencyEmail"
              label="Email"
              fullWidth
              onChange={(e) =>
                setEmergencyContact({
                  ...emergencyContact,
                  email: e.target.value,
                })
              }
              disabled={isEditMode}
            />
          </Box>

          <Box>
            <ColorButton
              variant="contained"
              sx={{ margin: "1.5rem 0 0.5rem 0.1rem" }}
              disabled={isEditMode}
            >
              Insurance Information
            </ColorButton>
            <TitleTextField
              label="Provider"
              fullWidth
              value={insuranceInfo.provider}
              onChange={(e) =>
                setInsuranceInfo({ ...insuranceInfo, provider: e.target.value })
              }
              disabled={isEditMode}
            />
            <TitleTextField
              label="Policy Number"
              fullWidth
              value={insuranceInfo.policyNumber}
              onChange={(e) =>
                setInsuranceInfo({
                  ...insuranceInfo,
                  policyNumber: e.target.value,
                })
              }
              disabled={isEditMode}
            />
          </Box>

          <Box>
            <br />
            <Button variant="contained" component="label">
              Upload Documents (if applicable)
              <input
                type="file"
                multiple
                hidden
                onChange={(e) => setDocuments(e.target.files)}
              />
            </Button>
            <Typography variant="body2" color="textSecondary">
              {documents && documents.length > 0
                ? `${documents.length} file(s) selected`
                : "No files selected"}
            </Typography>
          </Box>

          <Box>
            <ColorButton
              variant="contained"
              sx={{ margin: "1.5rem 0 0.5rem 0.1rem" }}
              disabled={isEditMode}
            >
              About Problem
            </ColorButton>
            <AboutTextField
              fullWidth
              onChange={(e) => setAbout(e.target.value)}
              sx={{ backgroundColor: "#fff" }}
              value={about}
              disabled={isEditMode}
            />
            <Box sx={{ textAlign: "right" }}>
              <ColorButton
                type="submit"
                variant="contained"
                color="primary"
                onClick={(element) => {
                  handleSubmit(element);
                }}
                disabled={isEditMode}
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
