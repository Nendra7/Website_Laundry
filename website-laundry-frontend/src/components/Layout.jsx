import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
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

export default function Layout() {
    const { pathname } = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { label: "Dashboard", path: "/" },
        { label: "Pelanggan", path: "/pelanggan" },
        { label: "Layanan", path: "/layanan" },
        { label: "Transaksi", path: "/transaksi" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
    ];

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

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
                            sx={{
                                backgroundColor:
                                    pathname === item.path ? "primary.light" : "transparent",
                            }}
                        >
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* Header full-width */}
            <AppBar position="fixed" sx={{ width: "100%" }}>
                <Toolbar sx={{ px: { xs: 2, sm: 3, md: 6, lg: 10, xl: 12 } }}>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                        <img
                            src={logo}
                            alt="Laundry Logo"
                            width={30}
                            height={30}
                            style={{ marginRight: 8 }}
                        />
                        <Typography variant="h6">Clean & Fresh Laundry</Typography>
                    </Box>

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

            {/* Spacer AppBar */}
            <Toolbar />

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    px: { xs: 2, sm: 3, md: 6, lg: 10, xl: 12 },
                    py: 3,
                    width: "100%",
                    maxWidth: "1200px",
                    mx: "auto",
                }}
            >
                <Outlet />
            </Box>

            {/* Footer full-width */}
            <Box sx={{ width: "100vw", bgcolor: "primary.dark", color: "#fff" }}>
                <Box
                    sx={{
                        maxWidth: "1200px",
                        mx: "auto",
                        px: { xs: 2, sm: 3, md: 6, lg: 10, xl: 12 },
                        py: 2,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="body2">
                        © {new Date().getFullYear()} Clean & Fresh Laundry
                    </Typography>
                    <Typography variant="caption">
                        Jl. Lumbu Utara 1A No. 66, Bekasi | Telp: 0812-3456-7890
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
