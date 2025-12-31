import supabase from "../supabase";

export const logAdminAction = async ({
  adminId,
  action,
  targetType,
  targetId,
  description,
}) => {
  await supabase.from("audit_logs").insert({
    admin_id: adminId,
    action,
    target_type: targetType,
    target_id: targetId,
    description,
  });
};
