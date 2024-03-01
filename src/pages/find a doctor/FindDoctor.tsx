import React, { useEffect, useState } from "react";
import { Box, Input, Select, MenuItem, Button, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { User } from "@supabase/gotrue-js";
import { supabase } from "../../supabase/config";
import FetchAllDoctor from "./FetchAllDoctor";
import DoctorCard from "../../components/doctorCard/DoctorCard";

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
  img: string;
};

const MainContainer = styled(Box)(() => ({}));
const SearchBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "1rem",
}));

function FindDoctor() {
  const [user, setUser] = useState<User | null>(null);
  const [fetchedData, setFetchedData] = useState<DoctorInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [searchData, setSearchData] = useState<DoctorInfo[]>([]);

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

  // Handle city input change
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  // Handle specialization select change
  const handleSpecializationChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSpecialization(event.target.value as string);
  };

  const handleSubmit = () => {
    console.log(city, specialization);
    const filteredData = fetchedData?.filter(
      (each) =>
        (city == "" || each.city.toLowerCase() == city.toLowerCase()) &&
        (specialization == "" ||
          each.specialization.toLowerCase() == specialization.toLowerCase())
    );

    console.log(filteredData);
    setSearchData(filteredData || []);
  };

  return (
    <MainContainer>
      <SearchBox>
        <Box
          sx={{
            padding: "3px",
            border: "1px solid black",
            borderRadius: "20px",
            backgroundColor: "#fff",
          }}
        >
          <Input
            value={city}
            onChange={handleCityChange}
            placeholder="Search city"
            disableUnderline
            sx={{ padding: "3px" }}
          />
          <span>| </span>
          <Select
            value={specialization}
            onChange={handleSpecializationChange}
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
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#1D2B53",
              "&:hover": { backgroundColor: "#16324C" },
              borderRadius: "20px",
            }}
          >
            Search
          </Button>
        </Box>
      </SearchBox>

      <Box sx={{ display: "flex" }}>
        {searchData?.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </Box>
    </MainContainer>
  );
}

export default FindDoctor;
