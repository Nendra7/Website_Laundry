import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/laundry.png";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Pelanggan", path: "/pelanggan" },
    { label: "Layanan", path: "/layanan" },
    { label: "Transaksi", path: "/transaksi" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Clean & Fresh Laundry
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={pathname === item.path}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}>
        <Toolbar>
          {/* Hamburger menu untuk mobile */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img
              src={logo}
              alt="Laundry Logo"
              width={30}
              height={30}
              style={{ marginRight: 8 }}
            />
            <Typography variant="h6" component="div">
              Clean & Fresh Laundry
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navItems.map((item) => (
              <Typography
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  borderBottom:
                    pathname === item.path ? "2px solid #fff" : "none",
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
