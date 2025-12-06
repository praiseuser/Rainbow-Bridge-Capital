import React from "react";
import { styles } from "./styles";

const HeroSection = () => {
  return (
    <div style={styles.container}>
      {/* Floating Blobs */}
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>

      <div style={styles.centerContent}>
        <h1 style={styles.bigTitle}>
          Smarter <span style={styles.gradient}>Investing</span> Starts Here
        </h1>

        <p style={styles.subtitleCenter}>
          Maximize your profits with AI-powered insights, seamless transactions,
          and real-time analytics built for modern investors.
        </p>

        <div style={styles.ctaWrapCenter}>
          <button style={styles.primaryBtn}>Get Started</button>
          <button style={styles.secondaryBtn}>Explore Plans</button>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
