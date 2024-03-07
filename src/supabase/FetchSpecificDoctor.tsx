import { supabase } from "./config";

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

// Add a type for the parameter
interface FetchDataParams {
  userEmail: string;
}

async function FetchSpecificDoctor({ userEmail }: FetchDataParams): Promise<{
  data: DoctorInfo[] | null;
  error: Error | null;
}> {
  try {
    const { data, error } = await supabase
      .from("doctorInfo")
      .select("*")
      .eq("email", userEmail);

    return { data, error };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: null, error: error as Error };
  }
}

export default FetchSpecificDoctor;
