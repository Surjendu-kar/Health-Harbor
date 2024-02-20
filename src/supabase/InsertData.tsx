import { supabase } from "./config";

async function InsertData(doctorData) {
  const { data, error } = await supabase
    .from("doctorInfo")
    .insert([
      {
        name: doctorData.name,
        email: doctorData.email,
        phoneno: doctorData.phoneno,
        bio: doctorData.bio,
        gender: doctorData.gender,
        specialization: doctorData.specialization,
        price: doctorData.price,
        address: doctorData.address,
        city: doctorData.city,
        qualifications: doctorData.qualifications,
        experiences: doctorData.experiences,
        timeSlot: doctorData.timeSlot,
        about: doctorData.about,
      },
    ])
    .select();

  if (error) {
    console.error("Error inserting data:", error);
    return null;
  }

  console.log("Inserted data:", data);
  return data;
}

export default InsertData;
