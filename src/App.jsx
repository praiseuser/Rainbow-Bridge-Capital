import React, { useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useLocation } from "react-router-dom"; // ← NEW IMPORT
import { useEffect } from "react"; // ← NEW IMPORT
import toast from "react-hot-toast"; // ← NEW IMPORT
import AppRoutes from "./routes/AppRoutes";
import themeSettings from "./theme";
import { Toaster } from "react-hot-toast";

// Toast Cleaner Component – dismisses all toasts on route change
const ToastCleaner = () => {
  const location = useLocation();

  useEffect(() => {
    toast.dismiss(); // Kill all active toasts when route changes
  }, [location.pathname]); // Triggers on every navigation

  return null;
};

const App = () => {
  const [mode, setMode] = useState("dark");

  const theme = useMemo(
    () => createTheme(themeSettings(mode)),
    [mode]
  );

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Clean up toasts on route change */}
      <ToastCleaner />
      
      {/* Your routes */}
      <AppRoutes toggleTheme={toggleTheme} />

      {/* Toaster */}
      <Toaster position="top-right" />
    </ThemeProvider>
  );
};

export default App;