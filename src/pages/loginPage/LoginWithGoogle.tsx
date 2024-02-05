import { useEffect, useState } from "react";
import { supabase } from "../../supabase/config";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

export function LoginWithGoogle() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  useEffect(() => {
    // Redirect only after user is logged in and a role is selected
    if (user && selectedRole) {
      if (selectedRole === "User") {
        navigate("/");
      } else if (selectedRole === "Doctor") {
        navigate("/profile");
      }
    }
  }, [user, selectedRole, navigate]);

  const handleRoleSelection = (role: string) => {
    console.log(`User selected role: ${role}`);
    setSelectedRole(role);
  };

  return (
    <>
      {!user && (
        <button onClick={handleLoginWithGoogle}>Login with Google</button>
      )}

    </>
  );
}
