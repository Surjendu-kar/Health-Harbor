import { useState } from "react";
import { TextField, Button, Typography, Grid, Box } from "@mui/material";
import contact from "../images/support1.png";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Grid item xs={12} md={2}>
          <Box sx={{ p: 2, pt: 0 }}>
            <Typography
              variant="h3"
              align="left"
              sx={{
                fontWeight: 700,
                letterSpacing: 2,
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={contact}
                      alt="Contact"
                      style={{ maxWidth: "100%" }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} mt={8}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                    type="email"
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    margin="normal"
                    required
                    multiline
                    rows={4}
                  />
                  <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
