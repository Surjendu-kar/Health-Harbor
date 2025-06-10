import { Box, Button, Rating, Typography, styled } from "@mui/material";
import defaultImg from "../../../../assets/Default_pfp-removebg-preview.png";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../../../supabase/config";
import React, { useEffect, useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ViewDetails from "../../../../components/viewDetails/ViewDetails";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
    height: "130px",
    width: "130px",
  },
  [theme.breakpoints.down("md")]: {
    height: "115px",
    width: "115px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "75px",
    width: "75px",
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
    fontSize: "0.95rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.85rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.65rem",
  },
}));

const AddressCity = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.65rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.55rem",
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
  img?: string;
  approved?: string;
};

const ShowRating = styled(Rating)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(18),
  [theme.breakpoints.down("lg")]: {
    fontSize: theme.typography.pxToRem(16),
  },
  [theme.breakpoints.down("md")]: {
    fontSize: theme.typography.pxToRem(14),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.pxToRem(9),
  },
}));

function DoctorOverView({
  user,
  fetchedData,
}: {
  user: User;
  fetchedData: DoctorInfo | null;
}) {
  const [imgPath, setImgPath] = useState(fetchedData?.img || defaultImg);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = React.useState<number | null>(3);

  const uploadRef = useRef<HTMLInputElement>(null);

  const handleFileInput = async (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    if (!file) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session:", session);
      if (!session) {
        toast.error('Please login to upload files');
        return;
      }

      // First, check if the file is an image
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }

      // Create a unique filename with user ID as folder
      const fileName = `${session.user.id}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

      const { data, error } = await supabase.storage
        .from("user-profile-picture")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type
        });

      if (error) {
        console.error('Upload error:', error);
        toast.error(error.message || 'Error uploading file');
        return;
      }

      if (data) {
        const { data: publicUrl } = supabase.storage
          .from("user-profile-picture")
          .getPublicUrl(data.path);

        if (publicUrl) {
          setImgPath(publicUrl.publicUrl);
          toast.success("Upload successful");
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
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
            .eq("email", user?.email)
            .select();

          if (error) {
            console.error("Error updating image:", error);
            toast.error("Failed to update profile image");
            return;
          }

          if (data) {
            console.log("Image updated successfully");
          }
        } catch (error) {
          console.error("Error updating image:", error);
          toast.error("An unexpected error occurred");
        }
      };

      updateImageInDatabase();
    }
  }, [imgPath, user?.email, fetchedData?.img]);

  useEffect(() => {
    const fetchRatings = async () => {
      if (fetchedData) {
        try {
          const { data: doctorInfo, error } = await supabase
            .from("doctorInfo")
            .select("feedback")
            .eq("email", fetchedData.email)
            .single();

          if (error && error.code !== 'PGRST116') {  // Only show error if it's not a "no rows returned" error
            console.error("Error fetching doctor info:", error);
            return;
          }

          if (doctorInfo && doctorInfo.feedback) {
            const feedback = JSON.parse(doctorInfo.feedback);
            const totalRating = feedback.reduce(
              (acc, curr) => acc + curr.rating,
              0
            );
            const averageRating =
              feedback.length > 0 ? totalRating / feedback.length : 3;
            setValue(averageRating);
          } else {
            setValue(3);  // Default rating when no feedback exists
          }
        } catch (error) {
          console.error("Error processing doctor info:", error);
          setValue(3);  // Set default rating on error
        }
      }
    };

    fetchRatings();
  }, [fetchedData]);

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
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Name>
                {fetchedData
                  ? fetchedData.name
                  : user?.user_metadata?.full_name}
              </Name>
              {fetchedData && fetchedData?.approved === "YES" ? (
                <CheckCircleIcon
                  sx={{
                    fontSize: {
                      xs: "0.8rem", // Small screens
                      sm: "1rem", // Medium screens
                      md: "1.2rem", // Large screens
                    },
                  }}
                />
              ) : (
                <CloseIcon
                  sx={{
                    fontSize: {
                      xs: "0.5rem", // Small screens
                      sm: "1.2rem", // Medium screens
                      md: "1.4rem", // Large screens
                    },
                  }}
                />
              )}
            </Box>

            {/* Rating */}
            <ShowRating
              name="read-only"
              value={value}
              precision={0.5}
              readOnly
            />
            {fetchedData && (
              <Box sx={{ display: "flex", gap: 1 }}>
                <AddressCity variant="body2">
                  {fetchedData.address},
                </AddressCity>
                <AddressCity variant="body2">{fetchedData.city}</AddressCity>
              </Box>
            )}
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

export default DoctorOverView;
