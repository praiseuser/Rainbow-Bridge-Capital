import supabase from "../supabase";
import toast from "react-hot-toast";

export const useInvest = () => {
  const invest = async (plan, amount, userId) => {
    try {
      const { data: wallet, error: walletError } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (walletError) throw walletError;

      if (wallet.balance < amount) {
        toast.error("Insufficient wallet balance");
        return;
      }

      const roiAmount = amount + (amount * plan.roi_percent) / 100;

      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + plan.duration_days);

      const { error: walletUpdateError } = await supabase
        .from("wallets")
        .update({
          balance: wallet.balance - amount,
        })
        .eq("user_id", userId);

      if (walletUpdateError) throw walletUpdateError;

      const { error: investError } = await supabase.from("investments").insert({
        user_id: userId,
        plan_id: plan.id,
        amount,
        roi_amount: roiAmount,
        status: "active",
        start_date: startDate,
        end_date: endDate,
      });

      if (investError) throw investError;

      toast.success("Investment successful");
    } catch (err) {
      console.error(err);
      toast.error("Investment failed. Try again.");
    }
  };

  return { invest };
};
