// LandingPage.jsx
import React from "react";
import Header from "../../components/Header/Header";
import HeroSection from "../../components/HeroSection/HeroSection";
import DescriptionSection from "../../components/DescriptionSection/DescriptionSection";
import SponsorsSection from "../../components/SponsorsSection/SponsorsSection";
import CTASection from "../../components/CTASection/CTASection";
import Footer from "../../components/Footer/Footer";

const LandingPage = () => {
  return (
    <div style={styles.container}>
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <section style={styles.heroWrapper}>
        <HeroSection />
      </section>

      {/* DESCRIPTION SECTION */}
      <section style={styles.section}>
        <DescriptionSection />
      </section>

      {/* SPONSORS SECTION */}
      <section style={styles.section}>
        <SponsorsSection />
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaWrapper}>
        <CTASection />
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    background: "#ffffff",
    overflow: "hidden",
  },

  heroWrapper: {
    marginTop: "80px", // leave space for fixed header if needed
    background: "linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #8b5cf6 100%)",
    padding: "100px 20px",
    position: "relative",
    overflow: "hidden",
  },

  section: {
    padding: "20px",
  },

  ctaWrapper: {
    padding: "20px",
    margin: "50px 0",
  },
};

export default LandingPage;
