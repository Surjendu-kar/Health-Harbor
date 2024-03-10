import React, { useState } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const citiesOfWestBengal = [
  "Kolkata",
  "Siliguri",
  "Darjeeling",
  "Howrah",
  "Durgapur",
  "Asansol",
  "Kharagpur",
  "Purulia",
];

const CityConatiner = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "34%",
  gap: theme.spacing(1),

  [theme.breakpoints.down("sm")]: { width: "100%" },
}));
const AddressConatiner = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  gap: theme.spacing(1),

  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(0),
    flexDirection: "column",
  },
}));

const AddressTextField = styled(TextField)(({ theme }) => ({
  marginTop: "1.5rem",
  display: "block",
  backgroundColor: "#fff",
  width: "68%",
  [theme.breakpoints.down("lg")]: {
    marginTop: "1rem",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0.7rem",
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

const CityTextField = styled(TextField)(({ theme }) => ({
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

const LocationFields = ({ isEditMode, setAddress, setCity, address, city }) => {
  const [citySuggestions, setCitySuggestions] = useState([]);

  const handleCityChange = (e) => {
    const input = e.target.value;
    setCity(input);
    const suggestions = input
      ? citiesOfWestBengal.filter((c) =>
          c.toLowerCase().startsWith(input.toLowerCase())
        )
      : [];
    setCitySuggestions(suggestions);
  };

  return (
    <AddressConatiner>
      <AddressTextField
        required
        value={address}
        id="address"
        label="Address"
        fullWidth
        onChange={(e) => setAddress(e.target.value)}
        disabled={!isEditMode}
      />
      <CityConatiner>
        <CityTextField
          required
          value={city}
          id="city"
          label="City"
          fullWidth
          onChange={handleCityChange}
          disabled={!isEditMode}
        />
        {citySuggestions.length > 0 && (
          <Paper
            sx={{
              position: "absolute",
              width: "100%",
              maxHeight: 300,
              overflow: "auto",
              zIndex: 1,
            }}
          >
            <List>
              {citySuggestions.map((suggestion, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => {
                    setCity(suggestion);
                    setCitySuggestions([]);
                  }}
                >
                  <ListItemText primary={suggestion} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </CityConatiner>
    </AddressConatiner>
  );
};

export default LocationFields;
