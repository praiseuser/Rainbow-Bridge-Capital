import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { styles, keyframes } from "./styles";

const OnboardingPage = () => {
  const navigate = useNavigate();
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

  const handleNext = () => {
    if (step === 1 && !form.supportsCommunity) {
      toast.error("Please make a selection");
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

  const handleFinish = () => {
    toast.success("Onboarding completed!");
    setTimeout(() => {
      navigate("/login", { state: { showSuccessToast: true } });
    }, 1000);
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div style={styles.container}>
      <Toaster position="top-right" />
      <style>{keyframes}</style>

      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />

      <div style={styles.wrapper}>
        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <div style={styles.progressText}>
            Step {step} of {totalSteps}
          </div>
        </div>

        {/* Main Card */}
        <div style={styles.card}>
          {/* Step 1 */}
          {step === 1 && (
            <div style={styles.stepContent}>
              <div style={styles.emoji}>🌈</div>
              <h2 style={styles.title}>Welcome to Rainbow Bridge Capital!</h2>
              <p style={styles.question}>Do you support LGBTQ+ & alternative lifestyles?</p>
              <div style={styles.buttonGroup}>
                <button
                  style={{
                    ...styles.choiceBtn,
                    ...(form.supportsCommunity === "yes" && styles.choiceBtnActive)
                  }}
                  onClick={() => setForm({ ...form, supportsCommunity: "yes" })}
                >
                  <Check size={20} />
                  <span>Yes, I do!</span>
                </button>
                <button
                  style={{
                    ...styles.choiceBtn,
                    ...(form.supportsCommunity === "no" && styles.choiceBtnActive)
                  }}
                  onClick={() => setForm({ ...form, supportsCommunity: "no" })}
                >
                  <span>No</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div style={styles.stepContent}>
              <div style={styles.emoji}>📢</div>
              <h2 style={styles.title}>How did you hear about us?</h2>
              <p style={styles.subtitle}>This helps us improve (Optional)</p>
              <input
                style={styles.input}
                placeholder="Twitter, Instagram, Friend, Blog..."
                value={form.hearAboutUs}
                onChange={(e) => setForm({ ...form, hearAboutUs: e.target.value })}
              />
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div style={styles.stepContent}>
              <div style={styles.emoji}>👥</div>
              <h2 style={styles.title}>Who referred you?</h2>
              <p style={styles.subtitle}>Enter their name if someone introduced you (Optional)</p>
              <input
                style={styles.input}
                placeholder="Referrer name or username"
                value={form.introducer}
                onChange={(e) => setForm({ ...form, introducer: e.target.value })}
              />
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div style={styles.stepContent}>
              <div style={styles.emoji}>📊</div>
              <h2 style={styles.title}>Investment Experience</h2>
              <p style={styles.question}>What's your investment experience level?</p>
              <div style={styles.buttonGroup}>
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <button
                    key={level}
                    style={{
                      ...styles.choiceBtn,
                      ...(form.investmentExperience === level && styles.choiceBtnActive)
                    }}
                    onClick={() => setForm({ ...form, investmentExperience: level })}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div style={styles.stepContent}>
              <div style={styles.emoji}>💰</div>
              <h2 style={styles.title}>Monthly Investment</h2>
              <p style={styles.question}>How much do you plan to invest monthly?</p>
              <div style={styles.buttonGroup}>
                {["$0-$500", "$500-$2,000", "$2,000-$5,000", "$5,000+"].map((amount) => (
                  <button
                    key={amount}
                    style={{
                      ...styles.choiceBtn,
                      ...(form.monthlyInvestment === amount && styles.choiceBtnActive)
                    }}
                    onClick={() => setForm({ ...form, monthlyInvestment: amount })}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6 */}
          {step === 6 && (
            <div style={styles.stepContent}>
              <div style={styles.emoji}>🎯</div>
              <h2 style={styles.title}>Your Goals</h2>
              <p style={styles.subtitle}>Select all that apply</p>
              <div style={styles.checkboxGroup}>
                {["Passive income", "10x portfolio", "Learn trading", "Long-term wealth", "Financial freedom"].map((goal) => (
                  <label key={goal} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      style={styles.checkbox}
                      checked={form.goals.includes(goal)}
                      onChange={() => handleCheckbox(goal)}
                    />
                    <span style={styles.checkboxText}>{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 7 */}
          {step === 7 && (
            <div style={styles.stepContent}>
              <div style={styles.emoji}>🔔</div>
              <h2 style={styles.title}>Stay Updated</h2>
              <p style={styles.subtitle}>Get notifications about opportunities & updates</p>
              <div style={styles.toggleContainer}>
                <label style={styles.toggleLabel}>
                  <input
                    type="checkbox"
                    style={styles.toggleInput}
                    checked={form.notifications}
                    onChange={(e) => setForm({ ...form, notifications: e.target.checked })}
                  />
                  <div style={{
                    ...styles.toggleSlider,
                    ...(form.notifications && styles.toggleSliderActive)
                  }}>
                    <div style={styles.toggleThumb} />
                  </div>
                  <span style={styles.toggleText}>
                    {form.notifications ? "Notifications Enabled" : "Notifications Disabled"}
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={styles.navButtons}>
            {step > 1 && (
              <button style={styles.backBtn} onClick={handleBack}>
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
            )}
            {step < totalSteps ? (
              <button style={styles.nextBtn} onClick={handleNext}>
                <span>Next</span>
                <ArrowRight size={20} />
              </button>
            ) : (
              <button style={styles.finishBtn} onClick={handleFinish}>
                <span>Complete Setup</span>
                <Check size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;

