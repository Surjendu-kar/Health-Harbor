import React, { useEffect, useState } from "react";
import Select, { components, StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import {
  Input,
  Box,
  MenuItem,
  Button,
  styled,
  Skeleton,
  Typography,
} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import FetchAllDoctor from "./FetchAllDoctor";
import DoctorCard from "../../components/doctorCard/DoctorCard";
import "../../App.css";
import '../../styles/react-select.css';

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
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  // [theme.breakpoints.down("md")]: {
  //   height: "60vh",
  // },
  // [theme.breakpoints.down("sm")]: {
  //   height: "65vh",
  // },
}));

const Container = styled(Box)(({ theme }) => ({
  marginTop: "1.5rem",
  width: "80%",
  [theme.breakpoints.down("sm")]: {
    marginTop: "0.5rem",
    width: "95%",
  },
}));

const TopContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#e9f0ff",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "20rem",
  justifyContent: "center",
  alignItems: "center",
  color: "#494a5f",

  [theme.breakpoints.down("lg")]: {
    height: "18rem",
  },
  [theme.breakpoints.down("sm")]: {
    height: "16rem",
  },

  [theme.breakpoints.down("sm")]: {
    height: "15rem",
  },
}));

const SubHeading = styled(Typography)(({ theme }) => ({
  fontSize: "h2",
  fontWeight: "bold",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {
    fontSize: "35px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "28px",
    textAlign: "center",
  },
}));

const Content = styled(Typography)(({ theme }) => ({
  fontSize: "h6",
  // margin: "0 25rem",
  // textAlign: "center",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {
    fontSize: "13px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
    textAlign: "center",
    margin: "0 2rem",
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

const cities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Ahmedabad',
  'Chennai',
  'Kolkata',
  'Surat',
  'Pune',
  'Jaipur',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Patna',
  'Vadodara',
  'Durgapur',
  'Purulia',
  'Salt Lake',
  // Add more cities as needed
];

const specializations = [
  'Cardiology',
  'Dentist',
  'Specialized',
  'Urology',
  'Neurology',
  'Orthopedic',
  'Stomach',
];

const styles: StylesConfig<{ value: string; label: string }, false> = {
  control: (provided, state) => ({
    ...provided,
    border: '1px solid #ccc',
    borderRadius: '20px',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(0, 119, 204, 0.25)' : null,
    '&:hover': {
      borderColor: '#aaa',
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#0077cc' : 'transparent',
    color: state.isSelected ? '#fff' : '#333',
    '&:hover': {
      backgroundColor: state.isSelected ? null : '#f0f0f0',
    },
  }),
};

const animatedComponents = makeAnimated();

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
      <TopContainer>
        <SubHeading variant="h3">Our Specialist</SubHeading>
        <br />
        <Content variant="h6" textAlign={"center"}>
          HealthHarbor always help to provide proper treatment <br />
          for all of get proper cure and healty life which is the most focus
          thing.
        </Content>
      </TopContainer>

      <Container>
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
              <Select
                options={cities.map((city) => ({ value: city, label: city }))}
                onChange={(option) => setCity(option?.value || '')}
                placeholder="Search city"
                isClearable
                isSearchable
                styles={styles}
                components={animatedComponents}
              />
              {/* <span>| </span> */}
              <Select
                options={specializations.map((spec) => ({ value: spec, label: spec }))}
                onChange={(option) => setSpecialization(option?.value || '')}
                placeholder="Select specialization"
                isClearable
                isSearchable
                styles={styles}
                components={animatedComponents}
              />

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
