// utilities/checkUserBlocked.js
import supabase from "../supabase";

export const checkUserBlocked = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("is_blocked, email, full_name")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error checking blocked status:", error);
      return { blocked: false };
    }

    if (data && data.is_blocked) {
      return {
        blocked: true,
        message:
          "Your account has been blocked. Please contact customer support for assistance.",
      };
    }

    return { blocked: false };
  } catch (err) {
    console.error("Error checking blocked status:", err);
    return { blocked: false };
  }
};
