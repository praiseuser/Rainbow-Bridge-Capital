// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const baseTypography = {
  fontFamily: "'Poppins', 'Inter', sans-serif",
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontWeightExtraBold: 900,
  h1: { fontSize: "3.5rem", fontWeight: 900 },
  h2: { fontSize: "2.8rem", fontWeight: 800 },
  h3: { fontSize: "2.2rem", fontWeight: 700 },
  h4: { fontSize: "1.8rem", fontWeight: 700 },
  body1: { fontSize: "1.1rem", lineHeight: 1.6 },
  body2: { fontSize: "1rem", lineHeight: 1.6 },
  button: { fontSize: "1rem", fontWeight: 600, textTransform: "none" },
};

const lightTheme = {
  palette: {
    mode: "light",

    // 🎨 Clean minimal 3-color palette
    primary: { main: "#22d3ee" },   // soft teal/blue
    secondary: { main: "#64748b" }, // muted slate gray
    accent: { main: "#f472b6" },    // warm coral/pink

    background: {
      default: "#f5f7fa",  // page background
      paper: "#ffffff",    // section card background
    },

    text: {
      primary: "#1e293b", // dark slate
      secondary: "#475569",
    },
  },

  typography: baseTypography,
};

const darkTheme = {
  palette: {
    mode: "dark",

    primary: { main: "#22d3ee" },
    secondary: { main: "#475569" },
    accent: { main: "#f472b6" },

    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },

    text: {
      primary: "#ffffff",
      secondary: "#cbd5e1",
    },
  },

  typography: baseTypography,
};

const themeSettings = (mode) =>
  createTheme(mode === "light" ? lightTheme : darkTheme);

export default themeSettings;
