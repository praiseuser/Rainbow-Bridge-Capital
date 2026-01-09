import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import supabase from "../../../supabase";
import { useAuth } from "../../../context/AuthContext";
import { styles, keyframes } from "./styles";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [step, setStep] = useState(1);
  const totalSteps = 7;

  const [form, setForm] = useState({
    supportsCommunity: "",
    hearAboutUs: "",
    introducer: "",
    investmentExperience: "",
    monthlyInvestment: "",
    goals: [],
    notifications: true,
  });

  /* =====================
     AUTH & ONBOARDED GUARD
  ====================== */
  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    // If not onboarded → go to onboarding
    if (!user.user_metadata?.onboarded) {
      navigate("/onboarding", { replace: true });
      return;
    }

    // Small delay to ensure metadata is fresh
    const timer = setTimeout(() => {
      if (!user.user_metadata?.onboarded) {
        navigate("/onboarding", { replace: true });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user, loading, navigate]);

  /* =====================
     VALIDATION & STEP CONTROLS
  ====================== */
  const handleNext = () => {
    if (step === 1 && !form.supportsCommunity) {
      toast.error("Please make a selection");
      return;
    }
    if (step === 4 && !form.investmentExperience) {
      toast.error("Please select your experience level");
      return;
    }
    if (step === 5 && !form.monthlyInvestment) {
      toast.error("Please select your monthly investment range");
      return;
    }
    if (step === 6 && form.goals.length === 0) {
      toast.error("Please select at least one goal");
      return;
    }

    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCheckbox = (goal) => {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  /* =====================
     FINISH ONBOARDING - FIXED (no hanging toast)
  ====================== */
  const handleFinish = async () => {
    const loadingToast = toast.loading("Finalizing setup…");

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          onboarded: true,
          onboarding_data: form,
        },
      });

      if (error) {
        toast.error("Failed to save", { id: loadingToast });
        return;
      }

      toast.success("Complete! Welcome 🎉", {
        id: loadingToast,
        duration: 1500,
      });

      await supabase.auth.signOut();

      // Triple cleanup
      toast.dismiss();
      setTimeout(() => toast.dismiss(), 100);

      navigate("/login", { replace: true });
    } catch (err) {
      toast.error("Error", { id: loadingToast });
    }
  };
  /* =====================
     IS FINISH READY?
  ====================== */
  const isFinishReady =
    form.supportsCommunity &&
    form.investmentExperience &&
    form.monthlyInvestment &&
    form.goals.length > 0;

  const progress = (step / totalSteps) * 100;

  /* =====================
     UI
  ====================== */
  return (
    <div style={styles.container}>
      <Toaster position="top-right" />
      <style>{keyframes}</style>

      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />

      <div style={styles.wrapper}>
        {/* Progress */}
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <div style={styles.progressText}>
            Step {step} of {totalSteps}
          </div>
        </div>

        <div style={styles.card}>
          {/* STEP 1 */}
          {step === 1 && (
            <div style={styles.stepContent}>
              <div style={styles.emoji}>🌈</div>
              <h2 style={styles.title}>Welcome to Rainbow Bridge Capital</h2>
              <p style={styles.question}>
                Do you support LGBTQ+ & alternative lifestyles?
              </p>

              <div style={styles.buttonGroup}>
                <button
                  style={{
                    ...styles.choiceBtn,
                    ...(form.supportsCommunity === "yes" && styles.choiceBtnActive),
                  }}
                  onClick={() => setForm({ ...form, supportsCommunity: "yes" })}
                >
                  <Check size={20} /> Yes
                </button>

                <button
                  style={{
                    ...styles.choiceBtn,
                    ...(form.supportsCommunity === "no" && styles.choiceBtnActive),
                  }}
                  onClick={() => setForm({ ...form, supportsCommunity: "no" })}
                >
                  No
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div style={styles.stepContent}>
              <div style={styles.emoji}>📢</div>
              <h2 style={styles.title}>How did you hear about us?</h2>
              <input
                style={styles.input}
                value={form.hearAboutUs}
                onChange={(e) => setForm({ ...form, hearAboutUs: e.target.value })}
                placeholder="Twitter, Instagram, Friend…"
              />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div style={styles.stepContent}>
              <div style={styles.emoji}>👥</div>
              <h2 style={styles.title}>Who referred you?</h2>
              <input
                style={styles.input}
                value={form.introducer}
                onChange={(e) => setForm({ ...form, introducer: e.target.value })}
                placeholder="Optional"
              />
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div style={styles.stepContent}>
              <div style={styles.emoji}>📊</div>
              <h2 style={styles.title}>Investment Experience</h2>

              <div style={styles.buttonGroup}>
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <button
                    key={level}
                    style={{
                      ...styles.choiceBtn,
                      ...(form.investmentExperience === level && styles.choiceBtnActive),
                    }}
                    onClick={() => setForm({ ...form, investmentExperience: level })}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div style={styles.stepContent}>
              <div style={styles.emoji}>💰</div>
              <h2 style={styles.title}>Monthly Investment</h2>

              <div style={styles.buttonGroup}>
                {["$0-$500", "$500-$2,000", "$2,000-$5,000", "$5,000+"].map((amount) => (
                  <button
                    key={amount}
                    style={{
                      ...styles.choiceBtn,
                      ...(form.monthlyInvestment === amount && styles.choiceBtnActive),
                    }}
                    onClick={() => setForm({ ...form, monthlyInvestment: amount })}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <div style={styles.stepContent}>
              <div style={styles.emoji}>🎯</div>
              <h2 style={styles.title}>Your Goals</h2>

              {[
                "Passive income",
                "10x portfolio",
                "Learn trading",
                "Long-term wealth",
                "Financial freedom",
              ].map((goal) => (
                <label key={goal} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={form.goals.includes(goal)}
                    onChange={() => handleCheckbox(goal)}
                  />
                  {goal}
                </label>
              ))}
            </div>
          )}

          {/* STEP 7 */}
          {step === 7 && (
            <div style={styles.stepContent}>
              <div style={styles.emoji}>🔔</div>
              <h2 style={styles.title}>Notifications</h2>

              <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input
                  type="checkbox"
                  checked={form.notifications}
                  onChange={(e) => setForm({ ...form, notifications: e.target.checked })}
                />
                Enable email & app updates
              </label>
            </div>
          )}

          {/* NAVIGATION */}
          <div style={styles.navButtons}>
            {step > 1 && (
              <button style={styles.backBtn} onClick={handleBack}>
                <ArrowLeft size={20} /> Back
              </button>
            )}

            {step < totalSteps ? (
              <button style={styles.nextBtn} onClick={handleNext}>
                Next <ArrowRight size={20} />
              </button>
            ) : (
              <button
                style={{
                  ...styles.finishBtn,
                  opacity: isFinishReady ? 1 : 0.5,
                  cursor: isFinishReady ? "pointer" : "not-allowed",
                }}
                onClick={handleFinish}
                disabled={!isFinishReady}
              >
                Complete Setup <Check size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;