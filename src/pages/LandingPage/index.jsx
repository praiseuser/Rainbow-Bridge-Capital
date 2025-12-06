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

  // HERO SECTION – First section, no spacing above
  heroWrapper: {
    width: "100%",
    padding: 0,
    marginTop: 0,
  },

  // OTHER SECTIONS — spacing between each section
  section: {
    width: "100%",
    padding: 0,
    marginTop: "40px", // spacing between sections
  },

  ctaWrapper: {
    width: "100%",
    padding: 0,
    marginTop: "40px", // spacing before CTA
  },
};



export default LandingPage;
