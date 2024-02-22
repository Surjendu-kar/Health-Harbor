import React from "react";
import {
  Typography,
  Container,
  Grid,
  Avatar,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Images
import doctor from "../images/doctor.png";
import history from "../images/history.jpg";
import team from "../images/team.png";
import value from "../images/value.jpeg";

const AboutCard = styled(Card)`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

function AboutUs() {
  // Calculate the minimum height for CardMedia
  const minHeight = 250;

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Grid container spacing={2} alignItems="center">
        <Grid item sx={{ mt: 4, mr: 2 }}>
          <Avatar
            src={doctor}
            variant="circle"
            sx={{
              width: { xs: 150, sm: 200, md: 250 },
              height: { xs: 150, sm: 200, md: 250 },
              boxShadow: 4,
            }}
          />
        </Grid>

        <Grid item>
          <Typography
            variant="h3"
            align="left"
            mb={2}
            sx={{
              fontWeight: 700,
              letterSpacing: 2,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            About Us
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            Your guided pathway to quality, affordable healthcare.
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            We're dedicated to revolutionizing healthcare management through
            innovative technology solutions.
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            Streamlining processes for administrators, doctors, and patients.
          </Typography>
        </Grid>
      </Grid>

      {/* About Sections */}
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <AboutCard>
            <CardMedia component="img" height={minHeight} image={team} />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Our Mission
              </Typography>
              <Typography>
                To make compassionate care accessible through technology.
              </Typography>
            </CardContent>
          </AboutCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <AboutCard>
            <CardMedia component="img" height={minHeight} image={history} />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                What We Do
              </Typography>
              <Typography>
                At HealthHarbor, we create innovative software for modern
                healthcare needs.
              </Typography>
            </CardContent>
          </AboutCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <AboutCard>
            <CardMedia component="img" height={minHeight} image={value} />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Our Core Values
              </Typography>
              <Typography>
                Trust, Diversity & Inclusion, Scientific Integrity, Compassion.
              </Typography>
            </CardContent>
          </AboutCard>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AboutUs;
