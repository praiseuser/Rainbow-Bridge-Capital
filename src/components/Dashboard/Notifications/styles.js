export const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
    py: { xs: 4, sm: 6 },
  },

  header: {
    textAlign: 'center',
    mb: { xs: 4, sm: 5 },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },

  headerIconWrapper: {
    width: { xs: 64, sm: 72 },
    height: { xs: 64, sm: 72 },
    borderRadius: '18px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
    animation: 'pulse 2s ease-in-out infinite',
    '@keyframes pulse': {
      '0%, 100%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.05)' },
    },
  },

  pageTitle: {
    fontWeight: 800,
    background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px',
    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
  },

  pageSubtitle: {
    color: '#64748b',
    fontSize: { xs: 14, sm: 16 },
    fontWeight: 500,
  },

  countChip: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontWeight: 700,
    fontSize: 14,
    px: 2,
  },

  emptyState: {
    textAlign: 'center',
    py: { xs: 6, sm: 10 },
    px: 3,
  },

  emptyIconWrapper: {
    width: { xs: 100, sm: 120 },
    height: { xs: 100, sm: 120 },
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mx: 'auto',
    mb: 3,
    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
    animation: 'float 3s ease-in-out infinite',
    '@keyframes float': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
    },
  },

  emptyTitle: {
    fontWeight: 700,
    color: '#1e293b',
    mb: 1,
    fontSize: { xs: '1.5rem', sm: '1.75rem' },
  },

  emptySubtitle: {
    color: '#64748b',
    maxWidth: 400,
    mx: 'auto',
    fontSize: { xs: 14, sm: 16 },
  },

  notificationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },

  notificationCard: {
    borderRadius: 3,
    border: '2px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateX(4px)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      borderColor: '#cbd5e1',
    },
  },

  notificationContent: {
    display: 'flex',
    gap: 2,
    alignItems: 'flex-start',
  },

  notificationIcon: (gradient) => ({
    width: 56,
    height: 56,
    background: gradient,
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  }),

  notificationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 1,
    mb: 1,
  },

  notificationTitle: {
    fontWeight: 700,
    color: '#1e293b',
    fontSize: { xs: 15, sm: 16 },
    flex: 1,
  },

  dismissButton: {
    color: '#94a3b8',
    '&:hover': {
      backgroundColor: '#f1f5f9',
      color: '#64748b',
    },
  },

  notificationMessage: {
    color: '#475569',
    lineHeight: 1.6,
    mb: 2,
    fontSize: { xs: 13, sm: 14 },
  },

  notificationFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
    flexWrap: 'wrap',
  },

  notificationTime: {
    color: '#94a3b8',
    fontSize: { xs: 11, sm: 12 },
    fontWeight: 500,
  },

  typeChip: (config) => ({
    backgroundColor: config.bgColor,
    color: config.color,
    fontWeight: 700,
    fontSize: 12,
  }),
};