import React from "react";
import { keyframes, styles } from "./styles";

const Services = () => {
    const services = [
        {
            title: "Inclusive Sponsorship",
            description:
                "Receive support and resources from LGBTQ+ and BDSM communities to grow and thrive.",
        },
        {
            title: "Mentorship Programs",
            description:
                "Connect with experienced mentors for guidance and advice in your projects.",
        },
        {
            title: "Workshops & Webinars",
            description:
                "Access exclusive workshops and webinars that empower and educate members.",
        },
        {
            title: "Networking Events",
            description:
                "Meet like-minded individuals and build valuable connections.",
        },
        {
            title: "Resources & Guides",
            description:
                "Premium content, guides, and tools to help you succeed in your journey.",
        },
    ];

    return (
        <div style={styles.container}>
            <style>{keyframes}</style>

            <div style={styles.hero}>
                <h1 style={styles.title}>Our Services</h1>
                <p style={styles.subtitle}>
                    Explore the benefits and offerings we provide to our community members.
                </p>
            </div>

            <div style={styles.cardsContainer}>
                {services.map((service, index) => (
                    <div
                        key={index}
                        style={{ ...styles.card, animationDelay: `${index * 0.15}s` }}
                    >
                        <h3 style={styles.cardTitle}>{service.title}</h3>
                        <p style={styles.cardDesc}>{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;