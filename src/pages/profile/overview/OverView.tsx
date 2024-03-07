import { Box, Button, Rating, Typography, styled } from "@mui/material";
import defaultImg from "../../../assets/Default_pfp-removebg-preview.png";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../../supabase/config";
import React, { useEffect, useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ViewDetails from "../../../components/viewDetails/ViewDetails";

const MainContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  margin: "2rem 0",
  [theme.breakpoints.down("lg")]: {
    margin: "0",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0",
  },
}));

const ImgBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const Img = styled("img")(({ theme }) => ({
  height: "140px",
  width: "140px",
  borderRadius: "10px",
  transition: "opacity 0.5s ease-in-out, filter 0.5s ease-in-out",
  opacity: 1,
  filter: "blur(0px)",

  [theme.breakpoints.down("lg")]: {
    height: "110px",
    width: "110px",
  },
  [theme.breakpoints.down("md")]: {
    height: "90px",
    width: "90px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "50px",
    width: "50px",
  },
}));

const ImgBtn = styled(Button)(({ theme }) => ({
  letterSpacing: "0.7px",
  padding: "0px 10px",
  fontSize: "0.7rem",
  backgroundColor: "#fff",
  color: "#000",
  ":hover": {
    backgroundColor: "grey",
    color: "#fff",
  },
  // Adjust CloudUploadIcon size based on breakpoints
  "& .MuiSvgIcon-root": {
    // Target the icon inside the button
    fontSize: "1rem", // Default size
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.9rem", // Adjust for large screens
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.6rem", // Adjust for medium screens
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.3rem", // Adjust for small screens
    },
  },
  [theme.breakpoints.down("lg")]: {
    padding: "0px 8px",
    fontSize: "0.6rem",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0",
    fontSize: "0.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0",
    fontSize: "0.2rem",
  },
}));

const NameRatingBox = styled(Box)(({ theme }) => ({
  marginLeft: "1rem",
  [theme.breakpoints.down("lg")]: {
    marginLeft: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: "0.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0.3rem",
  },
}));

const Name = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.5rem",
  },
}));

const ResponsiveRating = styled(Rating)(({ theme }) => ({
  fontSize: "0.9rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.4rem",
  },
}));

type DoctorInfo = {
  id: number;
  name: string;
  email: string;
  phoneno: string;
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

function OverView({
  user,
  fetchedData,
}: {
  user: User;
  fetchedData: DoctorInfo | null;
}) {
  const [imgPath, setImgPath] = useState(fetchedData?.img || defaultImg);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = React.useState<number | null>(2);

  const uploadRef = useRef<HTMLInputElement>(null);

  const handleFileInput = async (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    if (!file) return;

    try {
      const { data, error } = await supabase.storage
        .from("user-profile-picture")
        .upload(`avatar_${Date.now()}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      if (data && data?.fullPath) {
        // const fullPath = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/${data.Key}`;
        const fullPath = `https://eraerhfcolqnyopznyyb.supabase.co/storage/v1/object/public/${data.fullPath}`; //store it in env
        setImgPath(fullPath);
      }

      console.log("Upload successful", data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (imgPath && imgPath !== fetchedData?.img) {
      const updateImageInDatabase = async () => {
        try {
          const { data, error } = await supabase
            .from("doctorInfo")
            .update({ img: imgPath })
            .eq("email", user?.email);

          if (error) throw error;
          console.log("Database update successful", data);
        } catch (error) {
          console.error("Error updating data:", error);
        }
      };

      updateImageInDatabase();
    }
  }, [imgPath, user?.email, fetchedData?.img]);

  return (
    <MainContainer>
      {/* Img & Name */}
      <ImgBox>
        {/* Img */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Img
            src={imgPath}
            alt="profile-image"
            style={{
              opacity: isLoading ? 0.5 : 1,
              filter: isLoading ? "blur(2px)" : "blur(0px)",
            }}
            onLoad={() => setIsLoading(false)}
          />
        </Box>

        {user && fetchedData && (
          <NameRatingBox>
            {/* Name */}
            <Name>
              {fetchedData ? fetchedData.name : user?.user_metadata?.full_name}
            </Name>

            {/* Rating */}
            <ResponsiveRating name="read-only" value={value} readOnly />
          </NameRatingBox>
        )}
      </ImgBox>

      <label
        htmlFor="upload-profile-img"
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        <input
          type="file"
          name="upload-img"
          id="upload-profile-img"
          style={{ display: "none" }}
          onChange={handleFileInput}
          ref={uploadRef}
        />
        <ImgBtn
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onClick={() => {
            if (uploadRef?.current) {
              uploadRef.current.click();
            }
          }}
        >
          {imgPath && imgPath !== defaultImg ? "Edit" : "Add photo"}
        </ImgBtn>
      </label>

      {user && fetchedData && <ViewDetails fetchedData={fetchedData} />}
    </MainContainer>
  );
}

export default OverView;
