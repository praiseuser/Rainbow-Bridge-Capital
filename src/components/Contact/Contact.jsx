import React, { useState } from "react";
import { keyframes, styles } from "./styles";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log form
    console.log("Form submitted:", form);
    alert("Thanks for reaching out! We'll get back to you soon 💜");
    setForm({ name: "", email: "", message: "" });
  };

  const communityLinks = [
    { name: "LGBTQ+ Forum", link: "#" },
    { name: "BDSM Support", link: "#" },
    { name: "Discord Community", link: "#" },
    { name: "Mentorship Program", link: "#" },
  ];

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      <div style={styles.content}>
        {/* Left Section - Contact Info */}
        <div style={styles.leftSection}>
          <h2 style={styles.title}>Get in Touch</h2>
          <p style={styles.subtitle}>
            Reach out to us anytime! Our team and community sponsors are here to support you.
          </p>

          <div style={styles.links}>
            {communityLinks.map((item, index) => (
              <a key={index} href={item.link} style={styles.link}>
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Section - Form */}
        <div style={styles.rightSection}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              style={styles.textarea}
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              required
            />
            <button type="submit" style={styles.submitBtn}>
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Decorative floating circles */}
      <div style={styles.floatingCircle1}></div>
      <div style={styles.floatingCircle2}></div>
      <div style={styles.floatingCircle3}></div>
    </div>
  );
};

export default Contact;