// src/components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getHeaderStyles } from "./styles";

const Header = ({ toggleTheme }) => {
  const isMobile = useMediaQuery("(max-width:960px)");
  const styles = getHeaderStyles(null, isMobile);

  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ ...styles.appBar, ...(isScrolled && styles.appBarScrolled) }}
      >
        <Toolbar sx={styles.toolbar}>
          <Typography sx={styles.logo}>Rainbow Bridge Capital</Typography>

          {!isMobile && (
            <Box sx={styles.navWrap}>
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  sx={styles.navBtn}
                  component={Link}
                  to={item.path}
                >
                  {item.name}
                </Button>
              ))}

              {/* Navigate to dedicated pages */}
              <Button
                sx={styles.loginBtn}
                variant="outlined"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                sx={styles.signupBtn}
                variant="contained"
                component={Link}
                to="/signup"
              >
                Sign Up
              </Button>
            </Box>
          )}

          {isMobile && (
            <Box sx={styles.mobileRight}>
              <IconButton sx={styles.toggleBtn} onClick={toggleTheme}>
                <DarkModeIcon />
              </IconButton>
              <IconButton sx={styles.menuBtn} onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={styles.drawer}
      >
        <Box sx={styles.drawerContent}>
          <Box sx={styles.drawerHeader}>
            <Typography sx={styles.drawerLogo}>Rainbow Bridge Capital</Typography>
            <IconButton onClick={toggleDrawer(false)} sx={styles.closeBtn}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={styles.drawerList}>
            {menuItems.map((item) => (
              <ListItem key={item.name} disablePadding sx={{ ...styles.listItem }}>
                <ListItemButton
                  sx={styles.listItemButton}
                  component={Link}
                  to={item.path}
                  onClick={toggleDrawer(false)}
                >
                  <ListItemText primary={item.name} sx={styles.listItemText} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={styles.drawerButtons}>
            <Button
              sx={styles.drawerLoginBtn}
              variant="outlined"
              fullWidth
              component={Link}
              to="/login"
              onClick={() => setDrawerOpen(false)}
            >
              Login
            </Button>
            <Button
              sx={styles.drawerSignupBtn}
              variant="contained"
              fullWidth
              component={Link}
              to="/signup"
              onClick={() => setDrawerOpen(false)}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
