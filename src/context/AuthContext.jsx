import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [membership, setMembership] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch profile
  const fetchProfile = async (userId) => {
    if (!userId) {
      setProfile(null);
      setRole(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;

      setProfile(data);
      setRole(data?.role || "user");
    } catch (err) {
      console.error("Error fetching profile:", err);
      setProfile(null);
      setRole(null);
    }
  };

  // 🔹 Fetch membership (tier)
  const fetchMembership = async (userId) => {
    if (!userId) {
      setMembership(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("memberships")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      setMembership(data || null);
    } catch (err) {
      console.error("Error fetching membership:", err);
      setMembership(null);
    }
  };

  useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      const currentUser = data?.session?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        await Promise.all([
          fetchProfile(currentUser.id),
          fetchMembership(currentUser.id),
        ]);
      }

      setLoading(false);
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          fetchProfile(currentUser.id);
          fetchMembership(currentUser.id);
        } else {
          setProfile(null);
          setMembership(null);
          setRole(null);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        membership,
        role,
        loading,
        fetchMembership, // ✅ EXPOSE THIS
        fetchProfile, // ✅ EXPOSE THIS TOO (might be useful)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);