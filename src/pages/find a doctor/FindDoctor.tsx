import React, { useEffect, useState } from "react";
import { Box, Input, Select, MenuItem, Button, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { User } from "@supabase/gotrue-js";
import { supabase } from "../../supabase/config";
import FetchAllDoctor from "./FetchAllDoctor";

type DoctorInfo = {
  id: number;
  name: string;
  email: string;
  phoneno: string;
  bio: string;
  gender: string;
  specialization: string;
  price: number;
  address: string;
  city: string;
  qualifications: string[];
  experiences: string[];
  timeSlot: string[];
  about: string;
};

const MainContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "1rem",
}));

function FindDoctor() {
  const [user, setUser] = useState<User | null>(null);
  const [fetchedData, setFetchedData] = useState<DoctorInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch user login info
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  useEffect(() => {
    if (!fetchedData && user?.email) {
      const fetchData = async () => {
        const { data, error } = await FetchAllDoctor();
        setIsLoading(false);
        if (!error) {
          setFetchedData(data);
        }
      };

      fetchData();
    }
  }, [user?.email, fetchedData]);

  useEffect(() => {
    console.log(fetchedData);
  }, [fetchedData]);

  return (
    <MainContainer>
      <Box
        sx={{
          padding: "3px",
          border: "1px solid black",
          borderRadius: "20px",
        }}
      >
        <Input
          placeholder="search city"
          disableUnderline
          sx={{ padding: "3px" }}
        />
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
    </MainContainer>
  );
}

export default FindDoctor;
