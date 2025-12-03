export const keyframes = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  @keyframes fillBar {
    from { width: 0%; }
    to { width: 95%; }
  }
  @keyframes particle {
    0% { transform: translate(0, 0); opacity: 0.3; }
    50% { opacity: 0.8; }
    100% { transform: translate(50px, -50px); opacity: 0; }
  }
`;

export const styles = {
  container: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    padding: '80px 20px',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #d1fae5 100%)',
    overflow: 'hidden',
  },

  bgGradient1: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent 70%)',
    top: '-200px',
    right: '-100px',
    filter: 'blur(60px)',
    animation: 'float 15s ease-in-out infinite',
  },

  bgGradient2: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08), transparent 70%)',
    bottom: '-150px',
    left: '-100px',
    filter: 'blur(60px)',
    animation: 'float 12s ease-in-out infinite 2s',
  },

  floatingParticle1: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#10b981',
    top: '20%',
    left: '15%',
    animation: 'particle 8s ease-in-out infinite',
    opacity: 0.3,
  },

  floatingParticle2: {
    position: 'absolute',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#6366f1',
    top: '60%',
    right: '20%',
    animation: 'particle 10s ease-in-out infinite 2s',
    opacity: 0.3,
  },

  floatingParticle3: {
    position: 'absolute',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: '#ec4899',
    bottom: '30%',
    left: '25%',
    animation: 'particle 12s ease-in-out infinite 4s',
    opacity: 0.3,
  },

  content: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1400px',
    margin: '0 auto',
  },

  header: {
    textAlign: 'center',
    marginBottom: '60px',
    animation: 'fadeSlideUp 0.8s ease-out',
  },

  headerBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 24px',
    borderRadius: '50px',
    background: 'rgba(16, 185, 129, 0.1)',
    border: '2px solid rgba(16, 185, 129, 0.3)',
    marginBottom: '20px',
  },

  headerBadgeText: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#10b981',
    letterSpacing: '0.5px',
  },

  headerTitle: {
    fontSize: 'clamp(28px, 5vw, 56px)',
    fontWeight: 900,
    color: '#064e3b',
    marginBottom: '16px',
  },

  gradientText: {
    background: 'linear-gradient(135deg, #10b981, #6366f1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  headerSubtitle: {
    fontSize: 'clamp(14px, 2vw, 18px)',
    color: '#047857',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0 20px',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '30px',
  },

  '@media (min-width: 1024px)': {
    grid: {
      gridTemplateColumns: '1fr 2fr',
    },
  },

  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  profileCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '24px',
    border: '2px solid rgba(16, 185, 129, 0.2)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
    animation: 'scaleIn 0.6s ease-out 0.2s backwards',
  },

  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px',
  },

  avatarWrapper: {
    position: 'relative',
  },

  avatar: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #10b981, #6366f1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
  },

  verifiedBadge: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    background: '#ffffff',
    borderRadius: '50%',
    padding: '2px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  },

  editBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: 'transparent',
    border: '2px solid #10b981',
    borderRadius: '12px',
    color: '#10b981',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  editActions: {
    display: 'flex',
    gap: '8px',
  },

  saveBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: '#10b981',
    border: 'none',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  cancelBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    background: '#ef4444',
    border: 'none',
    borderRadius: '12px',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  editForm: {
    marginBottom: '12px',
  },

  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '24px',
    fontWeight: 800,
    color: '#064e3b',
    background: 'rgba(16, 185, 129, 0.05)',
    border: '2px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '12px',
    outline: 'none',
  },

  inputSmall: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#064e3b',
    background: 'rgba(16, 185, 129, 0.05)',
    border: '2px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '8px',
    outline: 'none',
  },

  profileName: {
    fontSize: 'clamp(22px, 4vw, 28px)',
    fontWeight: 800,
    color: '#064e3b',
    marginBottom: '12px',
  },

  verificationTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))',
    border: '2px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '12px',
    marginBottom: '24px',
  },

  verificationTagText: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#f59e0b',
  },

  profileInfoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
  },

  profileInfoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    background: 'rgba(16, 185, 129, 0.05)',
    borderRadius: '12px',
  },

  profileInfoContent: {
    flex: 1,
    minWidth: 0,
  },

  profileInfoLabel: {
    fontSize: '11px',
    color: '#6b7280',
    fontWeight: 600,
    marginBottom: '2px',
  },

  profileInfoValue: {
    fontSize: '13px',
    color: '#064e3b',
    fontWeight: 600,
    wordBreak: 'break-word',
  },

  joinedDate: {
    fontSize: '12px',
    color: '#6b7280',
    textAlign: 'center',
    paddingTop: '16px',
    borderTop: '1px solid rgba(16, 185, 129, 0.2)',
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },

  statCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '20px',
    border: '2px solid rgba(16, 185, 129, 0.2)',
    textAlign: 'center',
    animation: 'scaleIn 0.6s ease-out 0.4s backwards',
    transition: 'transform 0.3s ease',
  },

  statIcon: {
    fontSize: '28px',
    marginBottom: '8px',
  },

  statValue: {
    fontSize: '24px',
    fontWeight: 900,
    color: '#064e3b',
    marginBottom: '4px',
  },

  statLabel: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: 600,
  },

  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },

  questionsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    animation: 'fadeSlideIn 0.6s ease-out 0.2s backwards',
    flexWrap: 'wrap',
    gap: '12px',
  },

  questionsTitle: {
    fontSize: 'clamp(18px, 3vw, 24px)',
    fontWeight: 800,
    color: '#064e3b',
  },

  completionBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    background: 'rgba(16, 185, 129, 0.1)',
    borderRadius: '12px',
  },

  completionText: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#10b981',
  },

  questionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  questionCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '20px',
    border: '2px solid rgba(16, 185, 129, 0.2)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
    animation: 'fadeSlideIn 0.6s ease-out backwards',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
  },

  questionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    gap: '12px',
  },

  questionNumber: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #10b981, #6366f1)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 800,
    flexShrink: 0,
  },

  questionActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  verifiedIcon: {
    animation: 'pulse 2s ease-in-out infinite',
  },

  editQuestionBtn: {
    padding: '6px',
    background: 'transparent',
    border: '2px solid #10b981',
    borderRadius: '8px',
    color: '#10b981',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },

  questionEditActions: {
    display: 'flex',
    gap: '6px',
  },

  saveQuestionBtn: {
    padding: '6px',
    background: '#10b981',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },

  cancelQuestionBtn: {
    padding: '6px',
    background: '#ef4444',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },

  questionContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  question: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    fontWeight: 700,
    color: '#064e3b',
    lineHeight: 1.5,
  },

  answer: {
    padding: '14px',
    background: 'rgba(16, 185, 129, 0.05)',
    borderRadius: '12px',
    borderLeft: '4px solid #10b981',
  },

  answerLabel: {
    fontSize: '11px',
    color: '#6b7280',
    fontWeight: 600,
    marginBottom: '6px',
  },

  answerText: {
    fontSize: 'clamp(13px, 2vw, 15px)',
    color: '#047857',
    fontWeight: 600,
    lineHeight: 1.6,
  },

  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    color: '#047857',
    fontWeight: 600,
    background: '#ffffff',
    border: '2px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '8px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },

  questionShimmer: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '50%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
    animation: 'shimmer 3s infinite',
    pointerEvents: 'none',
  },

  trustScoreCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '24px',
    border: '2px solid rgba(99, 102, 241, 0.2)',
    boxShadow: '0 12px 32px rgba(99, 102, 241, 0.15)',
    animation: 'fadeSlideIn 0.6s ease-out 0.6s backwards',
  },

  trustScoreHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px',
  },

  trustScoreTitle: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#064e3b',
  },

  trustScoreSubtitle: {
    fontSize: '13px',
    color: '#6b7280',
  },

  trustScoreBar: {
    width: '100%',
    height: '12px',
    background: 'rgba(99, 102, 241, 0.1)',
    borderRadius: '100px',
    overflow: 'hidden',
    marginBottom: '16px',
  },

  trustScoreFill: {
    width: '95%',
    height: '100%',
    background: 'linear-gradient(90deg, #10b981, #6366f1)',
    borderRadius: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '12px',
    animation: 'fillBar 1.5s ease-out',
  },

  trustScoreValue: {
    fontSize: '11px',
    fontWeight: 800,
    color: '#ffffff',
  },

  trustScoreBenefits: {
    fontSize: '13px',
    color: '#047857',
    fontWeight: 600,
    textAlign: 'center',
  },
};