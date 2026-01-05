import React, { useState, useEffect } from "react";
import { User, Mail, Lock, Eye, EyeOff, Shield, Calendar, Save, Key, X, CheckCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";
import { styles } from "./styles";

const ProfilePage = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("full_name, email, user_type")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setName(data.full_name || "");
        setEmail(data.email || "");
        setUserType(data.user_type || "User");
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [user]);

  const handleProfileUpdate = async () => {
    try {
      setLoadingProfile(true);
      const { error } = await supabase
        .from("users")
        .update({
          full_name: name,
          email,
        })
        .eq("id", user.id);

      if (error) throw error;

      setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to update profile", severity: "error" });
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      setSnackbar({ open: true, message: "Fill all password fields", severity: "error" });
      return;
    }
    try {
      setLoadingPassword(true);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      setSnackbar({ open: true, message: "Password changed successfully!", severity: "success" });
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to change password", severity: "error" });
    } finally {
      setLoadingPassword(false);
    }
  };

  if (!user) return <div style={{ color: "white", textAlign: "center", padding: "40px" }}>Please login to view profile</div>;

  return (
    <>
      <style>{`
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }
        @keyframes float { 0%, 100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.1) rotate(5deg); } }
        
        .input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
        .button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(59, 130, 246, 0.5); }
        .button:disabled { opacity: 0.6; cursor: not-allowed; }
        .info-item:hover { background: #f3f4f6; transform: translateX(5px); }
        .eye-button:hover { color: #3b82f6; }
        
        @media (max-width: 768px) {
          .grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={styles.pageWrapper}>
        <div style={styles.animatedBg} />

        <div style={styles.container}>
          <div style={styles.header}>
            <h1 style={styles.headerTitle}>Profile Settings</h1>
            <p style={styles.headerSubtitle}>Manage your account and preferences</p>
          </div>

          <div style={styles.grid}>
            {/* Profile Info Card */}
            <div style={styles.profileCard}>
              <div style={styles.avatarWrapper}>
                <User style={styles.avatarIcon} />
                <div style={styles.onlineBadge} />
              </div>
              <h2 style={styles.userName}>{name || "User"}</h2>
              <p style={styles.userEmail}>{email}</p>
              <div style={styles.userBadge}>
                <Shield size={14} />
                {userType}
              </div>
            </div>

            {/* Edit Profile */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>
                <User size={24} />
                Edit Profile
              </h3>
              <p style={styles.cardSubtitle}>Update your personal information</p>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <User size={16} />
                  Full Name
                </label>
                <div style={styles.inputWrapper}>
                  <User size={18} style={styles.inputIcon} />
                  <input
                    className="input"
                    style={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Mail size={16} />
                  Email Address
                </label>
                <div style={styles.inputWrapper}>
                  <Mail size={18} style={styles.inputIcon} />
                  <input
                    className="input"
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button
                className="button"
                style={styles.button}
                onClick={handleProfileUpdate}
                disabled={loadingProfile}
              >
                <Save size={18} />
                {loadingProfile ? "Updating..." : "Update Profile"}
              </button>
            </div>

            {/* Change Password */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>
                <Lock size={24} />
                Change Password
              </h3>
              <p style={styles.cardSubtitle}>Keep your account secure</p>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Key size={16} />
                  Current Password
                </label>
                <div style={styles.inputWrapper}>
                  <Lock size={18} style={styles.inputIcon} />
                  <input
                    className="input"
                    style={{ ...styles.input, ...styles.inputPassword }}
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                  <button
                    className="eye-button"
                    style={styles.eyeButton}
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Key size={16} />
                  New Password
                </label>
                <div style={styles.inputWrapper}>
                  <Lock size={18} style={styles.inputIcon} />
                  <input
                    className="input"
                    style={{ ...styles.input, ...styles.inputPassword }}
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <button
                    className="eye-button"
                    style={styles.eyeButton}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                className="button"
                style={styles.button}
                onClick={handleChangePassword}
                disabled={loadingPassword}
              >
                <CheckCircle size={18} />
                {loadingPassword ? "Changing..." : "Change Password"}
              </button>
            </div>

            {/* Account Details */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>
                <Shield size={24} />
                Account Details
              </h3>
              <p style={styles.cardSubtitle}>Your account information</p>

              <div style={styles.infoGrid}>
                <div className="info-item" style={styles.infoItem}>
                  <div style={styles.infoIconWrapper}>
                    <User size={18} />
                  </div>
                  <div style={styles.infoContent}>
                    <div style={styles.infoLabel}>USER ID</div>
                    <div style={styles.infoValue}>{user.id.substring(0, 20)}...</div>
                  </div>
                </div>

                <div className="info-item" style={styles.infoItem}>
                  <div style={styles.infoIconWrapper}>
                    <Mail size={18} />
                  </div>
                  <div style={styles.infoContent}>
                    <div style={styles.infoLabel}>EMAIL</div>
                    <div style={styles.infoValue}>{user.email}</div>
                  </div>
                </div>

                <div className="info-item" style={styles.infoItem}>
                  <div style={styles.infoIconWrapper}>
                    <Shield size={18} />
                  </div>
                  <div style={styles.infoContent}>
                    <div style={styles.infoLabel}>ACCOUNT TYPE</div>
                    <div style={styles.infoValue}>{userType}</div>
                  </div>
                </div>

                <div className="info-item" style={styles.infoItem}>
                  <div style={styles.infoIconWrapper}>
                    <Calendar size={18} />
                  </div>
                  <div style={styles.infoContent}>
                    <div style={styles.infoLabel}>MEMBER SINCE</div>
                    <div style={styles.infoValue}>{new Date(user.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {snackbar.open && (
          <div style={{
            ...styles.snackbar,
            ...(snackbar.severity === "success" ? styles.snackbarSuccess : styles.snackbarError)
          }}>
            {snackbar.severity === "success" ? <CheckCircle size={20} /> : <X size={20} />}
            <span>{snackbar.message}</span>
            <button
              style={styles.closeBtn}
              onClick={() => setSnackbar({ ...snackbar, open: false })}
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;