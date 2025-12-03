import React from "react";
import { styles, keyframes } from "./styles";

const HeroSection = () => {
  const circleText = [
    "Invest Smarter",
    "Grow Faster",
    "Secure Transactions",
    "Real-time Insights",
    "Powerful Analytics",
    "Build Wealth",
  ];

  const renderCircleText = () => {
    const angleStep = 360 / circleText.length;
    return circleText.map((text, i) => {
      const angle = i * angleStep;
      const rad = (angle * Math.PI) / 180;
      const radius = 120; // half of circleWrapper
      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);
      return (
        <span
          key={i}
          style={{
            position: "absolute",
            transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
            color: "#1e293b", 
          }}
        >
          {text}
        </span>
      );
    });
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      <div style={styles.content}>
        {/* LEFT TEXT */}
        <div style={styles.leftSection}>
          <h1 style={styles.title}>
            Invest Smarter, <span style={styles.gradient}>Grow Faster</span>
          </h1>

          <p style={styles.subtitle}>
            Build wealth with confidence. Access real-time insights, secure
            transactions, and powerful analytics—all in one platform.
          </p>

          <div style={styles.ctaWrap}>
            <button style={styles.primaryBtn}>Start Investing</button>
            <button style={styles.secondaryBtn}>Learn More</button>
          </div>
        </div>

        {/* RIGHT CIRCLE TEXT DESIGN */}
        <div style={styles.rightSection}>
          <div style={styles.circleWrapper}>{renderCircleText()}</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
