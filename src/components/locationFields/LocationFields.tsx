import React, { useState } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

// Example cities array, replace or expand as needed
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
    <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
      <TextField
        required
        value={address}
        id="address"
        label="Address"
        fullWidth
        onChange={(e) => setAddress(e.target.value)}
        sx={{ marginTop: "1rem", backgroundColor: "#fff", width: "68%" }}
        disabled={!isEditMode}
      />
      <Box sx={{ position: "relative", width: "34%" }}>
        <TextField
          required
          value={city}
          id="city"
          label="City"
          fullWidth
          onChange={handleCityChange}
          sx={{ marginTop: "1rem", backgroundColor: "#fff" }}
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
      </Box>
    </Box>
  );
};

export default LocationFields;
