import React, { useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "./routes/AppRoutes";
import themeSettings from "./theme";

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
      <AppRoutes toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

export default App;
