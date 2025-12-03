export const getHeaderStyles = (isMobile) => {
  return {
    appBar: {
      backgroundColor: "#f8f9fa", // soft smoke-white
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
      transition: "all 0.3s ease",
      padding: "8px 0",
    },

    appBarScrolled: {
      backgroundColor: "#ffffff", // pure white when scrolled
      boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
    },

    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "0 20px" : "0 40px",
    },

    logo: {
      fontWeight: 800,
      fontSize: isMobile ? "1rem" : "1.2rem",
      background: "linear-gradient(135deg, #FFD700, #FF69B4, #8A2BE2)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
      animation: "slideDown 0.6s ease-out",
    },

    navWrap: {
      display: "flex",
      gap: "24px",
      alignItems: "center",
      animation: "slideDown 0.6s ease-out 0.2s backwards",
    },

    navBtn: {
      textTransform: "none",
      color: "#222", // dark text
      fontSize: "0.875rem",
      fontWeight: 700,
      "&:hover": {
        color: "#FFD700", // gold on hover
        transform: "translateY(-2px)",
        transition: "all 0.3s",
      },
    },

    loginBtn: {
      textTransform: "none",
      color: "#007bff", // blue
      borderColor: "#007bff",
      borderRadius: "50px",
      padding: "6px 16px",
      fontWeight: 700,
      fontSize: "0.875rem",
      "&:hover": {
        borderColor: "#FFD700",
        color: "#FFD700",
      },
    },

    signupBtn: {
      textTransform: "none",
      background: "linear-gradient(135deg, #007bff, #FF69B4)",
      color: "#fff",
      fontWeight: 700,
      borderRadius: "50px",
      padding: "6px 16px",
      fontSize: "0.875rem",
      boxShadow: "0 4px 15px #FF69B466",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 6px 20px #FF69B499",
      },
    },

    toggleBtn: {
      color: "#222",
      transition: "transform 0.3s",
      "&:hover": {
        transform: "rotate(180deg)",
      },
    },

    mobileRight: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },

    menuBtn: {
      color: "#222",
    },

    // Drawer Styles
    drawer: {
      "& .MuiDrawer-paper": {
        background: "#f8f9fa",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      },
    },

    drawerContent: {
      padding: "20px",
      minHeight: "auto",
    },

    drawerHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
      animation: "slideDown 0.4s ease-out",
    },

    drawerLogo: {
      fontWeight: 800,
      fontSize: "1.2rem",
      background: "linear-gradient(135deg, #FFD700, #FF69B4, #8A2BE2)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    closeBtn: {
      color: "#222",
    },

    drawerList: {
      padding: 0,
      marginBottom: "30px",
    },

    listItem: {
      marginBottom: "8px",
      animation: "slideLeft 0.4s ease-out backwards",
    },

    listItemButton: {
      borderRadius: "12px",
      padding: "14px 20px",
      "&:hover": {
        background: "rgba(0,0,0,0.03)",
      },
    },

    listItemText: {
      "& .MuiListItemText-primary": {
        color: "#222",
        fontWeight: 700,
        fontSize: "1.125rem",
      },
    },

    drawerButtons: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      animation: "slideUp 0.5s ease-out 0.3s backwards",
    },

    drawerLoginBtn: {
      borderColor: "#007bff",
      color: "#007bff",
      borderRadius: "50px",
      padding: "10px 0",
      fontWeight: 700,
      fontSize: "1rem",
    },

    drawerSignupBtn: {
      background: "linear-gradient(135deg, #007bff, #FF69B4)",
      color: "#fff",
      borderRadius: "50px",
      padding: "10px 0",
      fontWeight: 700,
      fontSize: "1rem",
      boxShadow: "0 4px 15px #FF69B466",
    },

    // Animations
    "@keyframes slideDown": {
      from: { opacity: 0, transform: "translateY(-20px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },

    "@keyframes slideLeft": {
      from: { opacity: 0, transform: "translateX(-30px)" },
      to: { opacity: 1, transform: "translateX(0)" },
    },

    "@keyframes slideUp": {
      from: { opacity: 0, transform: "translateY(30px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
  };
};
