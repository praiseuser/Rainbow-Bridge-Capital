import React from "react";
import { Sparkles, TrendingUp, Users, Zap, Shield, Globe } from "lucide-react";
import { styles, keyframes } from "./styles";

const DescriptionSection = () => {
    const features = [
        { icon: TrendingUp, text: "Crypto & Stocks", color: "#10b981" },
        { icon: Sparkles, text: "Digital Wallets", color: "#f59e0b" },
        { icon: Users, text: "Community Support", color: "#ec4899" }
    ];

    return (
        <div style={styles.container}>
            <style>{keyframes}</style>

            {/* Animated mesh background */}
            <div style={styles.meshBg} />
            <div style={styles.floatingOrb1} />
            <div style={styles.floatingOrb2} />
            <div style={styles.floatingOrb3} />

            <div style={styles.content}>
                {/* Badge */}
                <div style={styles.badge}>
                    <Sparkles size={16} color="#8b5cf6" />
                    <span style={styles.badgeText}>Next-Gen Platform</span>
                </div>

                {/* Main heading with gradient */}
                <h2 style={styles.title}>
                    A Smarter Way to Invest &<br />
                    Build <span style={styles.gradientText}>Financial Freedom</span>
                </h2>

                {/* Feature cards grid */}
                <div style={styles.featureGrid}>
                    {features.map((Feature, idx) => (
                        <div
                            key={idx}
                            style={{
                                ...styles.featureCard,
                                animationDelay: `${idx * 0.15}s`
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                e.currentTarget.style.boxShadow = `0 20px 40px ${Feature.color}30`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                            }}
                        >
                            <div style={{
                                ...styles.featureIconWrapper,
                                background: `${Feature.color}15`
                            }}>
                                <Feature.icon size={24} color={Feature.color} strokeWidth={2} />
                            </div>
                            <span style={styles.featureText}>{Feature.text}</span>
                            <div style={styles.featureShimmer} />
                        </div>
                    ))}
                </div>

                {/* Description */}
                <p style={styles.description}>
                    Empowering everyday investors with crypto, stocks, and community-powered
                    financial support. An all-in-one ecosystem built for <span style={styles.highlight}>transparency</span>,
                    <span style={styles.highlight}> growth</span>, and <span style={styles.highlight}>inclusion</span>.
                </p>

                {/* Highlight cards row */}
                <div style={styles.highlightRow}>
                    <div style={styles.highlightCard}>
                        <Shield size={20} color="#6366f1" />
                        <div style={styles.highlightContent}>
                            <div style={styles.highlightLabel}>Secure</div>
                            <div style={styles.highlightValue}>Bank-Level</div>
                        </div>
                    </div>

                    <div style={styles.highlightCard}>
                        <Zap size={20} color="#f59e0b" />
                        <div style={styles.highlightContent}>
                            <div style={styles.highlightLabel}>Fast</div>
                            <div style={styles.highlightValue}>Instant</div>
                        </div>
                    </div>

                    <div style={styles.highlightCard}>
                        <Globe size={20} color="#10b981" />
                        <div style={styles.highlightContent}>
                            <div style={styles.highlightLabel}>Global</div>
                            <div style={styles.highlightValue}>24/7</div>
                        </div>
                    </div>
                </div>

                {/* CTA Banner */}
                <div style={styles.ctaBanner}>
                    <div style={styles.ctaGlow} />
                    <div style={styles.ctaContent}>
                        <div style={styles.ctaIcon}>🎯</div>
                        <p style={styles.ctaText}>
                            <strong>Special Offer:</strong> Sponsored programs unlock exclusive benefits,
                            reduced rates & flexible financial plans
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DescriptionSection;