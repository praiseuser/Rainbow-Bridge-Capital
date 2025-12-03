import React from "react";
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";

const sections = [
  { name: "Overview", icon: <DashboardIcon /> },
  { name: "Investment", icon: <ShowChartIcon /> },
  { name: "Wallet", icon: <AccountBalanceWalletIcon /> },
  { name: "Loan", icon: <AttachMoneyIcon /> },
  { name: "Community", icon: <PeopleIcon /> },
];

const DashboardSidebar = ({ activeSection, setActiveSection, isMobileOpen, toggleMobile }) => {
  return (
    <Box
      sx={{
        width: { xs: isMobileOpen ? "200px" : 0, sm: "220px" },
        backgroundColor: "#1f2a38",
        color: "#ffffff",
        position: { xs: "fixed", sm: "fixed" },
        top: 0,
        left: 0,
        bottom: 0,
        pt: "80px",
        overflowY: "auto",
        transition: "width 0.3s ease",
        zIndex: 1200,
        display: { xs: isMobileOpen ? "block" : "none", sm: "block" },
        boxShadow: { xs: "2px 0 8px rgba(0,0,0,0.3)", sm: "none" },
      }}
    >
      <List>
        {sections.map((section) => (
          <ListItem key={section.name} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={activeSection === section.name}
              onClick={() => {
                setActiveSection(section.name);
                if (toggleMobile) toggleMobile(false);
              }}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#2e3b4c",
                  color: "#ffd700",
                  borderRadius: "12px",
                  "&:hover": { backgroundColor: "#2e3b4c" },
                },
                "&:hover": {
                  backgroundColor: "#262f3e",
                  borderRadius: "12px",
                },
                color: "#d0d7ff",
                justifyContent: "flex-start",
                px: 3,
                py: 2,
              }}
            >
              <ListItemIcon sx={{ color: activeSection === section.name ? "#ffd700" : "#d0d7ff", minWidth: 35 }}>
                {section.icon}
              </ListItemIcon>
              <ListItemText
                primary={section.name}
                primaryTypographyProps={{ fontWeight: 500, fontSize: "1rem" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DashboardSidebar;
