import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Select,
  MenuItem,
  Button,
  styled,
  Skeleton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FetchAllDoctor from "./FetchAllDoctor";
import DoctorCard from "../../components/doctorCard/DoctorCard";
import "../../App.css";

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

const MainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100vh",
  [theme.breakpoints.down("md")]: {
    height: "80vh",
  },
  [theme.breakpoints.down("sm")]: {
    height: "60vh",
  },
}));

const Container = styled(Box)(({ theme }) => ({
  width: "80%",
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));

const TopContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  margin: "2rem auto 3rem auto",
  width: "60%",
  textAlign: "center",

  [theme.breakpoints.down("md")]: {
    margin: "1.5rem auto 2rem auto",
    width: "80%",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "1rem auto 1.5rem auto",
    width: "90%",
  },
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "1rem 0 2rem 0",
  flexWrap: "wrap",

  [theme.breakpoints.down("lg")]: { margin: "1.5rem 0" },
  [theme.breakpoints.down("md")]: { margin: "1.25rem 0" },
  [theme.breakpoints.down("sm")]: { margin: "1rem 0" },

  "& > div": {
    display: "flex",
    alignItems: "center",
    border: "1px solid black",
    borderRadius: "20px",
    backgroundColor: "#fff",

    [theme.breakpoints.down("lg")]: {},
    [theme.breakpoints.down("md")]: {
      padding: "0.01rem 0.1rem",
    },
    [theme.breakpoints.down("sm")]: { padding: "0" },
  },

  "& .MuiInput-root, & .MuiSelect-root": {
    [theme.breakpoints.down("lg")]: { fontSize: "0.875rem" },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.7rem",
    },
    [theme.breakpoints.down("sm")]: { fontSize: "0.5rem" },
  },

  "& .MuiButton-root": {
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.7rem",
    },
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0.7),
      fontSize: "0.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.3rem",
      padding: "0.25rem 0.4rem",
      minWidth: "auto",
    },
  },

  "& .MuiButton-startIcon": {
    [theme.breakpoints.down("lg")]: {
      "& .MuiSvgIcon-root": {
        fontSize: "1.2rem",
      },
    },
    [theme.breakpoints.down("md")]: {
      "& .MuiSvgIcon-root": {
        fontSize: "0.8rem",
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& .MuiSvgIcon-root": {
        fontSize: "0.5rem",
      },
    },
  },
}));

const CardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "nowrap",
  width: "90vw",
  paddingBottom: "1rem",
  maxWidth: "100%",
  overflowX: "auto",
  "& > *": {
    flex: "0 0 auto",
  },
}));

const NoDataFoundBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "30vh",
  width: "100%",
  [theme.breakpoints.down("md")]: { height: "20vh" },
  [theme.breakpoints.down("sm")]: { height: "10vh" },
}));
const NoDataFoundText = styled(Typography)(({ theme }) => ({
  color: "red",
  fontSize: "1rem",
  [theme.breakpoints.down("md")]: { fontSize: "0.75rem" },
  [theme.breakpoints.down("sm")]: { fontSize: "0.5rem" },
}));

const SkeletonStyle = styled(Skeleton)(({ theme }) => ({
  width: "200px",
  height: "250px",
  borderRadius: "10px",
  [theme.breakpoints.down("lg")]: { width: "200px", height: "250px" },
  [theme.breakpoints.down("md")]: { width: "150px", height: "200px" },
  [theme.breakpoints.down("sm")]: { width: "100px", height: "150px" },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#15285ce8",
  letterSpacing: "0.85px",

  [theme.breakpoints.down("lg")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.8rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.1rem",
    letterSpacing: "0.7px",
  },
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#030d28ba",
  letterSpacing: "1px",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.86rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.55rem",
    letterSpacing: "0.7px",
  },
}));

function FindDoctor() {
  const [fetchedData, setFetchedData] = useState<DoctorInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [searchData, setSearchData] = useState<DoctorInfo[]>([]);

  useEffect(() => {
    if (!fetchedData) {
      const fetchData = async () => {
        const { data, error } = await FetchAllDoctor();
        setIsLoading(false);
        if (!error) {
          const approvedDoctors = data.filter(
            (doctor) => doctor.approved === "YES"
          );
          setFetchedData(approvedDoctors);
          setSearchData(approvedDoctors);
        }
      };

      fetchData();
    }
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filteredData = fetchedData.filter(
      (each) =>
        (city === "" || each.city.toLowerCase().includes(city.toLowerCase())) &&
        (specialization === "" ||
          each.specialization.toLowerCase() === specialization.toLowerCase())
    );

    setSearchData(filteredData);
  };

  return (
    <MainContainer>
      <Container>
        <TopContainer>
          <Heading>Our Specialist</Heading>
          <Title>
            HealthHarbor always help to provide proper treatment for all of get
            proper cure and healty life which is the most focus thing.
          </Title>
        </TopContainer>

        <form onSubmit={handleSubmit}>
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
                // sx={{ padding: "3px" }}
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
                type="submit"
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
          </SearchBox>
        </form>

        {!isLoading ? (
          <CardContainer className={!isLoading ? "fadeInAnimation" : ""}>
            {searchData.length > 0 ? (
              searchData.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            ) : (
              <NoDataFoundBox>
                <NoDataFoundText>No data found</NoDataFoundText>
              </NoDataFoundBox>
            )}
          </CardContainer>
        ) : (
          <CardContainer gap={2}>
            <SkeletonStyle variant="rectangular" />
            <SkeletonStyle variant="rectangular" />
            <SkeletonStyle variant="rectangular" />
            <SkeletonStyle variant="rectangular" />
            <SkeletonStyle variant="rectangular" />
            <SkeletonStyle variant="rectangular" />
          </CardContainer>
        )}
      </Container>
    </MainContainer>
  );
}

export default FindDoctor;
