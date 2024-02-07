import { supabase } from "./config";

async function UpdateData(userEmail, updates) {
  try {
    const { data, error } = await supabase
      .from("doctorInfo")
      .update(updates)
      .eq("email", userEmail);
      
    console.log(data);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating data:", error);
    return null;
  }
}

export default UpdateData;
