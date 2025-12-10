import React, { useState } from "react";
import { Box, IconButton, Drawer, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";
import { useTheme } from "@mui/material/styles";

const AdminLayout = ({ children }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box sx={styles(theme, isDark).container}>
      {/* Desktop Sidebar */}
      {!isMobile && <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />}

      {/* Main Content Area */}
      <Box sx={styles(theme, isDark, collapsed).mainArea}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={styles(theme, isDark).mobileMenuBtn}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <Box sx={styles(theme, isDark).content}>{children}</Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={styles(theme, isDark).drawer}
      >
        <AdminSidebar collapsed={false} setCollapsed={() => { }} />
      </Drawer>
    </Box>
  );
};

const styles = (theme, isDark, collapsed) => ({
  container: {
    display: "flex",
    minHeight: "100vh",
    background: isDark
      ? theme.palette.background.default
      : "#f7fafc",
  },

  mainArea: {
    flex: 1,
    marginLeft: { xs: 0, md: collapsed ? "80px" : "260px" },
    transition: "margin-left 0.3s ease",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },

  mobileMenuBtn: {
    position: "fixed",
    top: 16,
    left: 16,
    zIndex: 1100,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.accent.pink})`,
    color: "#fff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    "&:hover": {
      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.accent.pink})`,
      transform: "scale(1.05)",
    },
  },

  content: {
    flex: 1,
    p: { xs: 2, md: 4 },
    overflowY: "auto",
  },

  drawer: {
    "& .MuiDrawer-paper": {
      border: "none",
    },
  },
});

export default AdminLayout;