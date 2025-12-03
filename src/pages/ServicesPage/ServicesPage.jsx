import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Services from "../../components/Services/Services";

const ServicesPage = () => {
  return (
    <div>
      <Header />
      <main style={{ marginTop: "80px" }}> 
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
