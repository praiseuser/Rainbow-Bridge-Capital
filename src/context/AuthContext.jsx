import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async (userId) => {
        if (!userId) {
            setProfile(null);
            return;
        }
        try {
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", userId)
                .single();

            if (error) throw error;
            setProfile(data);
        } catch (err) {
            console.error("Error fetching profile:", err);
            setProfile(null);
        }
    };

    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            const { data } = await supabase.auth.getSession();
            const currentUser = data?.session?.user ?? null;
            setUser(currentUser);
            await fetchProfile(currentUser?.id);
            setLoading(false);
        };

        getInitialSession();

        // Listen to auth changes - NO ASYNC/AWAIT INSIDE!
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                const currentUser = session?.user ?? null;
                setUser(currentUser);

                // Only fetch profile if user exists, do it outside the listener
                if (currentUser) {
                    fetchProfile(currentUser.id);
                } else {
                    setProfile(null);
                }
            }
        );

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    // Optional: Refetch profile when user changes (safe because it's outside listener)
    useEffect(() => {
        if (user) {
            fetchProfile(user.id);
        } else {
            setProfile(null);
        }
    }, [user?.id]);

    return (
        <AuthContext.Provider value={{ user, profile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);