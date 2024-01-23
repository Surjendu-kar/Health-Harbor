// import React from "react";

// function Info() {
//   return (
//     <MainContainer>
//       <ProfileTitle>Profile Information</ProfileTitle>
//       <form onSubmit={handleSubmit}>
//         <TitleTextField
//           required
//           value={name}
//           id="name"
//           label="Name"
//           onChange={(e) => setName(e.target.value)}
//           fullWidth
//         />
//         {user && (
//           <TitleTextField
//             id="email"
//             label="Email*"
//             defaultValue={user.email}
//             InputProps={{
//               readOnly: true,
//             }}
//             disabled
//             fullWidth
//           />
//         )}
//         <TitleTextField
//           required
//           value={phone}
//           id="phone"
//           label="Phone"
//           onChange={handlePhoneChange}
//           fullWidth
//         />
//         {phoneError && (
//           <Typography variant="inherit" sx={{ color: "red" }}>
//             {phoneError}
//           </Typography>
//         )}
//         <TitleTextField
//           required
//           value={bio}
//           id="bio"
//           label="Bio"
//           onChange={(e) => setBio(e.target.value)}
//           fullWidth
//         />

//         <SelectOption>
//           <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">Gender*</InputLabel>
//             <Select
//               required
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={gender}
//               label="gender"
//               onChange={(e) => setGender(e.target.value)}
//               sx={{ backgroundColor: "#fff" }}
//             >
//               <MenuItem value="male">Male</MenuItem>
//               <MenuItem value="female">Female</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">
//               Specialization*
//             </InputLabel>
//             <Select
//               required
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={specialization}
//               label="specialization"
//               onChange={(e) => setSpecialization(e.target.value)}
//               sx={{ backgroundColor: "#fff" }}
//             >
//               <MenuItem value="cardiology">Cardiology</MenuItem>
//               <MenuItem value="dentist">Dentist</MenuItem>
//               <MenuItem value="specialized">Specialized</MenuItem>
//               <MenuItem value="urology">Urology</MenuItem>
//               <MenuItem value="neurology">Neurology</MenuItem>
//               <MenuItem value="orthopedic">Orthopedic</MenuItem>
//               <MenuItem value="stomach">Stomach</MenuItem>
//             </Select>
//           </FormControl>

//           <TitleTextField
//             required
//             value={price}
//             id="price"
//             label="Ticket Price"
//             fullWidth
//             onChange={(e) => setPrice(e.target.value)}
//             sx={{ marginTop: 0 }}
//           />
//         </SelectOption>
//         {/* </NameBox> */}
//         {/* Qualification Section */}
//         <Box>
//           <ColorButton onClick={handleAddQualification} variant="contained">
//             Add Qualification
//           </ColorButton>
//           {qualifications.map((qualification, index) => (
//             <Qualification
//               key={index}
//               qualification={qualification}
//               onQualificationChange={(qualificationData) =>
//                 handleQualificationChange(index, qualificationData)
//               }
//             />
//           ))}
//         </Box>
//         {/* Experience Section */}
//         <Box>
//           <ColorButton onClick={handleAddExperience} variant="contained">
//             Add Experience
//           </ColorButton>
//           {experiences.map((experience, index) => (
//             <Experiences
//               key={index}
//               experience={experience}
//               onExperienceChange={(experienceData) =>
//                 handleExperienceChange(index, experienceData)
//               }
//             />
//           ))}
//         </Box>

//         {/* TimeSlot Section */}
//         <Box>
//           <ColorButton onClick={handleSetTimeSlot} variant="contained">
//             Set TimeSlot
//           </ColorButton>
//           {timeSlot && <TimeSlot />}
//         </Box>

//         <Typography sx={{ fontSize: "0.9rem", marginTop: "1rem" }}>
//           About
//         </Typography>
//         <TextField
//           fullWidth
//           onChange={(e) => setAbout(e.target.value)}
//           sx={{ backgroundColor: "#fff" }}
//         ></TextField>

//         <ColorButton
//           type="submit"
//           variant="contained"
//           color="primary"
//           // disabled={!isFormValid}
//         >
//           Submit
//         </ColorButton>
//       </form>
//     </MainContainer>
//   );
// }

// export default Info;
