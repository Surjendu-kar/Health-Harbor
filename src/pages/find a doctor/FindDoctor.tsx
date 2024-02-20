import React from "react";
import { Box, Input, Select, MenuItem, Button, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const MainContainer = styled(Box)(() => ({
  // You can add styles to the MainContainer if needed
}));

function FindDoctor() {
  return (
    <MainContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            padding: "3px",
            border: "1px solid black",
            borderRadius: "20px",
            marginTop: "1rem",
          }}
        >
          <Input placeholder="search city" disableUnderline />
          <span>| </span>
          <Select
            defaultValue=""
            displayEmpty
            input={<Input disableUnderline />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <span>Select an option</span>;
              }
              return selected;
            }}
          >
            <MenuItem value="">
              <em>Select an option</em>
            </MenuItem>
            <MenuItem value="cardiology">Cardiology</MenuItem>
            <MenuItem value="dentist">Dentist</MenuItem>
            <MenuItem value="specialized">Specialized</MenuItem>
            <MenuItem value="urology">Urology</MenuItem>
            <MenuItem value="neurology">Neurology</MenuItem>
            <MenuItem value="orthopedic">Orthopedic</MenuItem>
            <MenuItem value="stomach">Stomach</MenuItem>
          </Select>

          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{
              backgroundColor: "#1D2B53",
              "&:hover": { backgroundColor: "#16324C" },
              borderRadius: "20px",
            }}
          >
            Search
          </Button>
        </Box>
      </Box>
    </MainContainer>
  );
}

export default FindDoctor;
