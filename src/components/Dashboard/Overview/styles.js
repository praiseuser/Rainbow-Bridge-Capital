export const styles = {
    pageContainer: {
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        py: { xs: 4, sm: 6 },
    },

    header: {
        textAlign: 'center',
        mb: { xs: 4, sm: 6 },
    },

    pageTitle: {
        fontWeight: 800,
        background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.5px',
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        mb: 1,
    },

    pageSubtitle: {
        color: '#64748b',
        fontSize: { xs: 15, sm: 17 },
        fontWeight: 500,
    },

    gridContainer: {
        justifyContent: 'center',
        maxWidth: 1000,
        mx: 'auto',
    },

    statCard: {
        position: 'relative',
        height: '100%',
        minHeight: { xs: 200, sm: 240 },
        borderRadius: 4,
        border: '3px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
            borderColor: '#667eea',
        },
    },

    cardPattern: (bgPattern) => ({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: bgPattern,
        transform: 'translate(50%, -50%)',
        pointerEvents: 'none',
    }),

    cardContent: {
        position: 'relative',
        p: { xs: 3, sm: 4 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    iconSection: {
        mb: 3,
    },

    iconWrapper: (gradient) => ({
        width: { xs: 80, sm: 96 },
        height: { xs: 80, sm: 96 },
        borderRadius: '24px',
        background: gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.35)',
        animation: 'float 3s ease-in-out infinite',
        '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
        },
    }),

    icon: {
        fontSize: { xs: 40, sm: 48 },
        color: 'white',
    },

    contentSection: {
        width: '100%',
    },

    cardLabel: {
        color: '#64748b',
        fontWeight: 700,
        fontSize: { xs: 14, sm: 16 },
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        mb: 1.5,
    },

    cardValue: {
        fontWeight: 900,
        color: '#1e293b',
        letterSpacing: '-1px',
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        lineHeight: 1.2,
    },

    skeletonCard: {
        height: '100%',
        minHeight: { xs: 200, sm: 240 },
        borderRadius: 4,
        border: '3px solid #e2e8f0',
    },

    skeletonCardContent: {
        p: { xs: 3, sm: 4 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    skeletonHeader: {
        mb: 3,
    },

    skeletonBody: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
};