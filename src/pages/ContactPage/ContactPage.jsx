import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Contact from "../../components/Contact/Contact";

const ContactPage = () => {
  return (
    <div>
      <Header />
      <main style={{ marginTop: "80px" }}> 
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
