export const getStyles = (theme, isMobile) => {
  const isDark = theme.palette.mode === "dark";

  return {
    root: {
      width: "100%",
      position: "relative",
      overflow: "hidden",
    },

    // Animated background particles
    particle: {
      position: "absolute",
      borderRadius: "50%",
      background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.2)",
      animation: "float 20s infinite ease-in-out",
    },

    appBar: {
      backgroundColor: "transparent",
      boxShadow: "none",
      backdropFilter: "blur(10px)",
    },

    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
    },

    logo: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightExtraBold,
      fontSize: "1.2rem",
      background: isDark
        ? "linear-gradient(90deg, #fff, #f0f0f0)"
        : "linear-gradient(90deg, #fff, #e0e0e0)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    rightWrap: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },

    navWrap: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
    },

    navBtn: {
      textTransform: "none",
      color: theme.palette.text.primary,
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      fontFamily: theme.typography.fontFamily,
      "&:hover": {
        color: theme.palette.accent.gold,
        transform: "translateY(-2px)",
        transition: "all 0.3s",
      },
    },

    loginBtn: {
      textTransform: "none",
      color: theme.palette.text.primary,
      borderColor: theme.palette.text.primary,
      borderRadius: "20px",
      px: 3,
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightMedium,
      "&:hover": {
        borderColor: theme.palette.accent.gold,
        color: theme.palette.accent.gold,
      },
    },

    signupBtn: {
      textTransform: "none",
      background: `linear-gradient(90deg, ${theme.palette.accent.pink} 0%, ${theme.palette.accent.purple} 100%)`,
      color: "#fff",
      fontWeight: theme.typography.fontWeightBold,
      fontFamily: theme.typography.fontFamily,
      borderRadius: "20px",
      px: 3,
      boxShadow: `0 4px 15px ${theme.palette.accent.purple}66`,
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: `0 6px 20px ${theme.palette.accent.purple}99`,
      },
    },

    toggleBtn: {
      ml: 1,
      color: theme.palette.text.primary,
      transition: "transform 0.3s",
      "&:hover": {
        transform: "rotate(180deg)",
      },
    },

    "@keyframes float": {
      "0%, 100%": { transform: "translateY(0px)" },
      "50%": { transform: "translateY(-20px)" },
    },
  };
};
