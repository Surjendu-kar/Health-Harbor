import { Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const ContactInfo = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box sx={{ p: 4 }}>
        <Typography variant="h4">Contact Information</Typography>

        <Box display="flex" alignItems="center" my={2}>
          <LocationOnIcon sx={{ mr: 1 }} />
          <Typography>123 Main St, City, State</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <PhoneIcon sx={{ mr: 1 }} />
          <Typography>555-123-4567</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactInfo;