import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import supabase from "../../../supabase";
import { styles } from "./styles";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) return toast.error("Please fill all fields");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: "https://rainbow-bridge-capital.vercel.app/auth/callback", // Changed this
        },
      });

      if (error) throw error;

      toast.success("Account created! Check your email to verify.");
      navigate("/verify-email"); // Changed: Go to verify-email page (not /verify)

    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1>Join Our Platform</h1>
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"}
        </button>
        <button onClick={handleSignUp} disabled={loading}>
          {loading ? "Creating..." : "Create Account"} <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;