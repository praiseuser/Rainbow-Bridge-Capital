import { useEffect, useState } from "react";
import supabase from "../supabase";
import { useAuth } from "../context/AuthContext";

export const useWallet = () => {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchWallet = async () => {
      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!error) setWallet(data);
      setLoading(false);
    };

    fetchWallet();
  }, [user]);

  return { wallet, loading };
};
