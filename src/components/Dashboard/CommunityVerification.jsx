import React, { useState } from "react";
import { CheckCircle, User, Mail, Phone, MapPin, Award, Shield, Edit, Save, X } from "lucide-react";
import { styles, keyframes } from "./styles";

const CommunityVerificationSection = () => {
  const [editMode, setEditMode] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const [profileInfo, setProfileInfo] = useState({
    name: "Alex Rivera",
    email: "alex.rivera@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    verificationLevel: "Gold Member",
    joinedDate: "March 2024"
  });

  const [verificationQuestions, setVerificationQuestions] = useState([
    {
      question: "What is your primary investment goal?",
      answer: "Long-term wealth building",
      verified: true
    },
    {
      question: "How did you hear about Rainbow Bridge Capital?",
      answer: "Community referral program",
      verified: true
    },
    {
      question: "What type of financial support are you seeking?",
      answer: "Investment guidance and portfolio management",
      verified: true
    },
    {
      question: "Are you part of any LGBTQ+ organizations?",
      answer: "Yes, local pride chapter member",
      verified: true
    },
  ]);

  const [tempProfile, setTempProfile] = useState(profileInfo);
  const [tempAnswer, setTempAnswer] = useState("");

  const handleSaveProfile = () => {
    setProfileInfo(tempProfile);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setTempProfile(profileInfo);
    setEditMode(false);
  };

  const handleEditQuestion = (idx) => {
    setEditingQuestion(idx);
    setTempAnswer(verificationQuestions[idx].answer);
  };

  const handleSaveAnswer = (idx) => {
    const updated = [...verificationQuestions];
    updated[idx].answer = tempAnswer;
    setVerificationQuestions(updated);
    setEditingQuestion(null);
  };

  const handleCancelAnswer = () => {
    setEditingQuestion(null);
    setTempAnswer("");
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      {/* Background effects */}
      <div style={styles.bgGradient1} />
      <div style={styles.bgGradient2} />
      <div style={styles.floatingParticle1} />
      <div style={styles.floatingParticle2} />
      <div style={styles.floatingParticle3} />

      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerBadge}>
            <Shield size={20} color="#10b981" />
            <span style={styles.headerBadgeText}>Verified Community Member</span>
          </div>
          <h2 style={styles.headerTitle}>
            Community <span style={styles.gradientText}>Verification</span>
          </h2>
          <p style={styles.headerSubtitle}>
            Your trusted profile in the Rainbow Bridge Capital community
          </p>
        </div>

        {/* Main Grid */}
        <div style={styles.grid}>
          {/* Left Column - Profile Info */}
          <div style={styles.leftColumn}>
            {/* Profile Card */}
            <div style={styles.profileCard}>
              <div style={styles.profileHeader}>
                <div style={styles.avatarWrapper}>
                  <div style={styles.avatar}>
                    <User size={40} color="#ffffff" strokeWidth={2.5} />
                  </div>
                  <div style={styles.verifiedBadge}>
                    <CheckCircle size={24} color="#10b981" fill="#10b981" />
                  </div>
                </div>
                {!editMode ? (
                  <button
                    style={styles.editBtn}
                    onClick={() => setEditMode(true)}
                  >
                    <Edit size={16} />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div style={styles.editActions}>
                    <button style={styles.saveBtn} onClick={handleSaveProfile}>
                      <Save size={16} />
                      <span>Save</span>
                    </button>
                    <button style={styles.cancelBtn} onClick={handleCancelEdit}>
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              {editMode ? (
                <div style={styles.editForm}>
                  <input
                    style={styles.input}
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    placeholder="Name"
                  />
                </div>
              ) : (
                <h3 style={styles.profileName}>{profileInfo.name}</h3>
              )}

              <div style={styles.verificationTag}>
                <Award size={16} color="#f59e0b" />
                <span style={styles.verificationTagText}>{profileInfo.verificationLevel}</span>
              </div>

              <div style={styles.profileInfoList}>
                <div style={styles.profileInfoItem}>
                  <Mail size={18} color="#6366f1" />
                  <div style={styles.profileInfoContent}>
                    <div style={styles.profileInfoLabel}>Email</div>
                    {editMode ? (
                      <input
                        style={styles.inputSmall}
                        value={tempProfile.email}
                        onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                      />
                    ) : (
                      <div style={styles.profileInfoValue}>{profileInfo.email}</div>
                    )}
                  </div>
                </div>

                <div style={styles.profileInfoItem}>
                  <Phone size={18} color="#ec4899" />
                  <div style={styles.profileInfoContent}>
                    <div style={styles.profileInfoLabel}>Phone</div>
                    {editMode ? (
                      <input
                        style={styles.inputSmall}
                        value={tempProfile.phone}
                        onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                      />
                    ) : (
                      <div style={styles.profileInfoValue}>{profileInfo.phone}</div>
                    )}
                  </div>
                </div>

                <div style={styles.profileInfoItem}>
                  <MapPin size={18} color="#8b5cf6" />
                  <div style={styles.profileInfoContent}>
                    <div style={styles.profileInfoLabel}>Location</div>
                    {editMode ? (
                      <input
                        style={styles.inputSmall}
                        value={tempProfile.location}
                        onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                      />
                    ) : (
                      <div style={styles.profileInfoValue}>{profileInfo.location}</div>
                    )}
                  </div>
                </div>
              </div>

              <div style={styles.joinedDate}>
                Member since {profileInfo.joinedDate}
              </div>
            </div>

            {/* Stats Cards */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>🎯</div>
                <div style={styles.statValue}>100%</div>
                <div style={styles.statLabel}>Verified</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>⭐</div>
                <div style={styles.statValue}>4.9</div>
                <div style={styles.statLabel}>Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column - Verification Questions */}
          <div style={styles.rightColumn}>
            <div style={styles.questionsHeader}>
              <h3 style={styles.questionsTitle}>Verification Questions</h3>
              <div style={styles.completionBadge}>
                <CheckCircle size={16} color="#10b981" />
                <span style={styles.completionText}>4/4 Completed</span>
              </div>
            </div>

            <div style={styles.questionsList}>
              {verificationQuestions.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.questionCard,
                    animationDelay: `${idx * 0.1}s`
                  }}
                >
                  <div style={styles.questionHeader}>
                    <div style={styles.questionNumber}>{idx + 1}</div>
                    <div style={styles.questionActions}>
                      {item.verified && editingQuestion !== idx && (
                        <div style={styles.verifiedIcon}>
                          <CheckCircle size={20} color="#10b981" fill="#10b981" />
                        </div>
                      )}
                      {editingQuestion !== idx ? (
                        <button
                          style={styles.editQuestionBtn}
                          onClick={() => handleEditQuestion(idx)}
                        >
                          <Edit size={16} />
                        </button>
                      ) : (
                        <div style={styles.questionEditActions}>
                          <button
                            style={styles.saveQuestionBtn}
                            onClick={() => handleSaveAnswer(idx)}
                          >
                            <Save size={16} />
                          </button>
                          <button
                            style={styles.cancelQuestionBtn}
                            onClick={handleCancelAnswer}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={styles.questionContent}>
                    <div style={styles.question}>{item.question}</div>
                    <div style={styles.answer}>
                      <div style={styles.answerLabel}>Your Answer:</div>
                      {editingQuestion === idx ? (
                        <textarea
                          style={styles.textarea}
                          value={tempAnswer}
                          onChange={(e) => setTempAnswer(e.target.value)}
                          rows={3}
                        />
                      ) : (
                        <div style={styles.answerText}>{item.answer}</div>
                      )}
                    </div>
                  </div>
                  <div style={styles.questionShimmer} />
                </div>
              ))}
            </div>

            {/* Trust Score */}
            <div style={styles.trustScoreCard}>
              <div style={styles.trustScoreHeader}>
                <Shield size={24} color="#6366f1" />
                <div>
                  <div style={styles.trustScoreTitle}>Community Trust Score</div>
                  <div style={styles.trustScoreSubtitle}>Based on verification & activity</div>
                </div>
              </div>
              <div style={styles.trustScoreBar}>
                <div style={styles.trustScoreFill}>
                  <span style={styles.trustScoreValue}>95%</span>
                </div>
              </div>
              <div style={styles.trustScoreBenefits}>
                ✓ Priority support • ✓ Reduced fees • ✓ Exclusive programs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityVerificationSection;