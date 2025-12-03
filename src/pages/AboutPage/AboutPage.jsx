import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AboutUs from "../../components/AboutUs/AboutUs";

const AboutPage = () => {
  return (
    <div>
      <Header />
      <main style={{ marginTop: "80px" }}> 
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
