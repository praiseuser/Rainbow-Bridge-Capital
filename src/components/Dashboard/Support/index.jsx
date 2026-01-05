import React, { useState } from "react";
import { Mail, MessageCircle, HelpCircle, Clock, Shield, Wallet, ChevronDown, X } from "lucide-react";
import { styles } from "./styles";

const SupportPage = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleSubmit = async () => {
    if (!subject || !message) {
      setSnackbar({ open: true, message: "Please fill all fields", severity: "error" });
      return;
    }

    try {
      setLoading(true);
      // Replace with your Supabase call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubject("");
      setMessage("");
      setSnackbar({ 
        open: true, 
        message: "Message sent successfully! We'll respond within 24 hours.", 
        severity: "success" 
      });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to send message", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const faqData = [
    { 
      icon: Clock, 
      question: "How long do withdrawals take?", 
      answer: "Withdrawals are processed within 24–48 hours. For larger amounts, it may take up to 72 hours for additional security verification." 
    },
    { 
      icon: Shield, 
      question: "Is my investment safe?", 
      answer: "Yes, all investments are handled securely with bank-level encryption. We use multi-factor authentication and cold storage for maximum security." 
    },
    { 
      icon: Wallet, 
      question: "How do I fund my wallet?", 
      answer: "Go to Wallet → Fund Wallet and follow the instructions. We support bank transfers, credit cards, and cryptocurrency deposits." 
    },
    { 
      icon: HelpCircle, 
      question: "What are your support hours?", 
      answer: "Our support team is available 24/7 via email. Live chat is available Monday-Friday, 9 AM - 6 PM EST." 
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeInDown { 
          from { opacity: 0; transform: translateY(-30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        @keyframes pulse { 
          0%, 100% { opacity: 1; transform: scale(1); } 
          50% { opacity: 0.8; transform: scale(1.05); } 
        }
        @keyframes slideDown { 
          from { opacity: 0; transform: translate(-50%, -20px); } 
          to { opacity: 1; transform: translate(-50%, 0); } 
        }
        
        .quick-action-card:hover { 
          transform: translateY(-8px); 
          background: rgba(255,255,255,0.15); 
          box-shadow: 0 20px 40px rgba(0,0,0,0.2); 
        }
        .input:focus, .textarea:focus { 
          border-color: #667eea; 
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); 
        }
        .submit-button:hover:not(:disabled) { 
          transform: translateY(-2px); 
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5); 
        }
        .submit-button:disabled { 
          opacity: 0.6; 
          cursor: not-allowed; 
        }
        .accordion:hover { 
          background: #f3f4f6; 
        }
        .accordion-header:hover { 
          background: rgba(102, 126, 234, 0.05); 
        }
        .chevron-expanded { 
          transform: rotate(180deg); 
        }
        
        @media (max-width: 768px) {
          .main-grid { 
            grid-template-columns: 1fr; 
          }
        }
      `}</style>

      <div style={styles.pageWrapper}>
        <div style={styles.animatedBackground} />
        
        <div style={styles.container}>
          <div style={styles.header}>
            <h1 style={styles.headerTitle}>How Can We Help You?</h1>
            <p style={styles.headerSubtitle}>Our support team is here to assist you 24/7</p>
            <div style={styles.statusChip}>
              <div style={styles.onlineDot} />
              Online Now
            </div>
          </div>

          <div style={styles.grid}>
            <div className="quick-action-card" style={styles.quickActionCard}>
              <Mail style={styles.quickActionIcon} />
              <h3 style={styles.quickActionTitle}>Email Support</h3>
              <p style={styles.quickActionText}>Get a response within 24h</p>
            </div>
            <div className="quick-action-card" style={styles.quickActionCard}>
              <MessageCircle style={styles.quickActionIcon} />
              <h3 style={styles.quickActionTitle}>Live Chat</h3>
              <p style={styles.quickActionText}>Chat with us in real-time</p>
            </div>
            <div className="quick-action-card" style={styles.quickActionCard}>
              <HelpCircle style={styles.quickActionIcon} />
              <h3 style={styles.quickActionTitle}>FAQ Center</h3>
              <p style={styles.quickActionText}>Find instant answers</p>
            </div>
          </div>

          <div className="main-grid" style={styles.mainGrid}>
            <div style={styles.card}>
              <h2 style={styles.formTitle}>Send Us a Message</h2>
              <p style={styles.formSubtitle}>We typically respond within a few hours</p>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Subject</label>
                <input
                  className="input"
                  style={styles.input}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What do you need help with?"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Your Message</label>
                <textarea
                  className="textarea"
                  style={styles.textarea}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue in detail..."
                />
              </div>

              <button
                className="submit-button"
                style={styles.submitButton}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>

            <div style={styles.card}>
              <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
              
              {faqData.map((faq, index) => {
                const Icon = faq.icon;
                const isExpanded = expandedFaq === index;
                
                return (
                  <div key={index} className="accordion" style={styles.accordion}>
                    <button
                      className="accordion-header"
                      style={styles.accordionHeader}
                      onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    >
                      <div style={styles.faqQuestion}>
                        <div style={styles.faqIconWrapper}>
                          <Icon size={18} />
                        </div>
                        <span style={styles.faqQuestionText}>{faq.question}</span>
                      </div>
                      <ChevronDown
                        size={20}
                        style={styles.chevron}
                        className={isExpanded ? "chevron-expanded" : ""}
                      />
                    </button>
                    {isExpanded && (
                      <div style={styles.accordionContent}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {snackbar.open && (
          <div style={{
            ...styles.snackbar,
            ...(snackbar.severity === "success" ? styles.snackbarSuccess : styles.snackbarError)
          }}>
            <span>{snackbar.message}</span>
            <button
              style={styles.closeButton}
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

export default SupportPage;