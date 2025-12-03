import React from "react";
import { keyframes, styles } from "./styles";

const AboutUs = () => {
  const benefits = [
    {
      title: "Inclusive Sponsorship",
      text: "Receive support and resources from LGBTQ+ and BDSM communities to help you grow and thrive in your endeavors.",
    },
    {
      title: "Networking Opportunities",
      text: "Connect with like-minded individuals, mentors, and collaborators within the communities.",
    },
    {
      title: "Exclusive Events & Insights",
      text: "Gain access to workshops, seminars, and insights that empower and educate members.",
    },
    {
      title: "Community Recognition",
      text: "Showcase your involvement and contributions, enhancing credibility and social impact.",
    },
  ];

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      <div style={styles.content}>
        <div style={styles.leftSection}>
          <h2 style={styles.title}>About Us</h2>
          <p style={styles.subtitle}>
            Rainbow Bridge Capital is proudly supported by LGBTQ+ and BDSM communities. We provide a safe, inclusive, and empowering environment for everyone to access resources, mentorship, and exclusive networking opportunities.
          </p>
        </div>

        <div style={styles.rightSection}>
          {benefits.map((benefit, index) => (
            <div style={{ ...styles.benefitCard, animationDelay: `${index * 0.2}s` }} key={index}>
              <div style={styles.benefitTitle}>{benefit.title}</div>
              <div style={styles.benefitText}>{benefit.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.floatingCircle1}></div>
      <div style={styles.floatingCircle2}></div>
      <div style={styles.floatingCircle3}></div>
    </div>
  );
};

export default AboutUs;