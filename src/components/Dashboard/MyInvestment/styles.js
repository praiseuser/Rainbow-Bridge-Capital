export const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
    py: 6,
  },

  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
  },

  loader: {
    color: '#667eea',
  },

  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    textAlign: 'center',
    px: 3,
  },

  emptyIconWrapper: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 3,
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
  },

  emptyTitle: {
    fontWeight: 700,
    color: '#1e293b',
    mb: 1,
  },

  emptySubtitle: {
    color: '#64748b',
    maxWidth: 400,
  },

  headerSection: {
    mb: 5,
    position: 'relative',
  },

  headerContent: {
    position: 'relative',
    zIndex: 2,
  },

  pageTitle: {
    fontWeight: 800,
    background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: 1,
    letterSpacing: '-0.5px',
  },

  pageSubtitle: {
    color: '#64748b',
    fontSize: 18,
  },

  statCard: {
    height: '100%',
    borderRadius: 3,
    border: '2px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      borderColor: '#667eea',
    }
  },

  statIconWrapper: (color) => ({
    width: 56,
    height: 56,
    borderRadius: '14px',
    background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 2,
    boxShadow: `0 4px 12px ${color}40`,
  }),

  statLabel: {
    color: '#64748b',
    fontWeight: 600,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    mb: 1,
  },

  statValue: (color) => ({
    fontWeight: 800,
    color: color,
    letterSpacing: '-0.5px',
  }),

  investmentCard: {
    borderRadius: 4,
    border: '2px solid #e2e8f0',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.15)',
      borderColor: '#667eea',
    }
  },

  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 3,
    backgroundColor: '#fafbff',
  },

  planAvatar: {
    width: 56,
    height: 56,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontSize: 24,
    fontWeight: 700,
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },

  planName: {
    fontWeight: 700,
    color: '#1e293b',
    fontSize: 18,
  },

  investmentId: {
    color: '#64748b',
    fontSize: 13,
    fontFamily: 'monospace',
  },

  statusChip: (config) => ({
    backgroundColor: config.bgColor,
    color: config.color,
    fontWeight: 700,
    fontSize: 13,
    px: 1.5,
    py: 0.5,
    '& .MuiChip-icon': {
      color: config.color,
    }
  }),

  cardBody: {
    p: 3,
  },

  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  },

  infoLabel: {
    color: '#64748b',
    fontWeight: 600,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  infoValue: {
    fontWeight: 700,
    color: '#1e293b',
    fontSize: 18,
  },

  infoValueGreen: {
    fontWeight: 700,
    color: '#10b981',
    fontSize: 18,
  },

  progressContainer: {
    mt: 3,
    p: 2.5,
    borderRadius: 2,
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
  },

  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1.5,
  },

  progressLabel: {
    fontWeight: 600,
    color: '#475569',
    fontSize: 14,
  },

  progressPercentage: {
    fontWeight: 700,
    color: '#667eea',
    fontSize: 16,
  },

  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e2e8f0',
    '& .MuiLinearProgress-bar': {
      borderRadius: 5,
      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    }
  },

  completedBanner: {
    mt: 3,
    p: 2.5,
    borderRadius: 2,
    background: 'linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 100%)',
    border: '2px solid #a5b4fc',
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },

  completedText: {
    color: '#4338ca',
    fontWeight: 600,
    fontSize: 15,
  },
};