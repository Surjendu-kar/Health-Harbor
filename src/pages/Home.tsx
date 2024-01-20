import { useEffect, useState } from "react";
import { supabase } from "../supabase/config";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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
    const timer = setTimeout(() => {
      if (!user) {
        navigate("/login");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  console.log(user);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div>
      {user && (
        <div>
          <img src={user.user_metadata?.avatar_url} alt="" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      Home
    </div>
  );
}

export default Home;
