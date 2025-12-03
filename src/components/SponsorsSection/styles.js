// styles/sponsorStyles.js

export const keyframes = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  @keyframes particle {
    0% { transform: translate(0, 0) scale(1); opacity: 0; }
    50% { opacity: 0.8; }
    100% { transform: translate(100px, -100px) scale(0); opacity: 0; }
  }
`;

export const sponsorStyles = {
    container: {
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        margin: '100px auto',
        padding: '0 20px',
        overflow: 'hidden',
    },

    particle1: {
        position: 'absolute',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#ec4899',
        top: '20%',
        left: '10%',
        animation: 'particle 4s ease-in-out infinite',
        opacity: 0,
    },

    particle2: {
        position: 'absolute',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#8b5cf6',
        top: '60%',
        right: '15%',
        animation: 'particle 5s ease-in-out infinite 1s',
        opacity: 0,
    },

    particle3: {
        position: 'absolute',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: '#06b6d4',
        bottom: '30%',
        left: '20%',
        animation: 'particle 6s ease-in-out infinite 2s',
        opacity: 0,
    },

    content: {
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
    },

    badge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 16px',
        borderRadius: '50px',
        background: 'rgba(99, 102, 241, 0.1)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        marginBottom: '20px',
        animation: 'scaleIn 0.5s ease-out',
    },

    badgeText: {
        fontSize: '13px',
        fontWeight: 600,
        color: '#6366f1',
    },

    title: {
        fontSize: 'clamp(28px, 4vw, 42px)',
        fontWeight: 800,
        marginBottom: '50px',
        color: '#1a1a1a',
        animation: 'fadeSlideUp 0.6s ease-out 0.1s backwards',
    },

    gradientText: {
        background: 'linear-gradient(135deg, #6366f1, #ec4899, #8b5cf6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },

    sponsorGrid: {
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        marginBottom: '60px',
        flexWrap: 'wrap',
    },

    sponsorCard: {
        position: 'relative',
        width: '100px',
        height: '100px',
        borderRadius: '20px',
        background: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: 'scaleIn 0.6s ease-out backwards',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    },

    iconWrapper: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease',
        zIndex: 2,
    },

    shimmer: {
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
        animation: 'shimmer 2.5s infinite',
    },

    descCard: {
        position: 'relative',
        maxWidth: '750px',
        margin: '0 auto 50px',
        padding: '30px 40px',
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.05), rgba(139, 92, 246, 0.05))',
        borderRadius: '20px',
        border: '1px solid rgba(236, 72, 153, 0.15)',
        animation: 'fadeSlideUp 0.8s ease-out 0.4s backwards',
    },

    descIcon: {
        position: 'absolute',
        top: '-15px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid rgba(236, 72, 153, 0.2)',
        animation: 'pulse 2s ease-in-out infinite',
    },

    description: {
        fontSize: 'clamp(15px, 2vw, 17px)',
        lineHeight: 1.8,
        color: '#555',
        margin: 0,
    },

    highlight: {
        fontWeight: 700,
        color: '#ec4899',
    },

    statsRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
        flexWrap: 'wrap',
        animation: 'fadeSlideUp 1s ease-out 0.6s backwards',
    },

    statItem: {
        textAlign: 'center',
    },

    statNumber: {
        fontSize: 'clamp(28px, 4vw, 36px)',
        fontWeight: 800,
        background: 'linear-gradient(135deg, #6366f1, #ec4899)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '5px',
    },

    statLabel: {
        fontSize: '14px',
        color: '#666',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },

    statDivider: {
        width: '1px',
        height: '40px',
        background: 'linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.1), transparent)',
    },
};
