import { useState } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import Sidebar, { drawerWidth } from "../components/Sidebar";

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileDrawer = () => setMobileOpen(false);
  const toggleMobileDrawer = () => setMobileOpen((open) => !open);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleMobileDrawer}
            sx={{ display: { md: "none" }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            AI Workflow
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar mobileOpen={mobileOpen} onMobileClose={closeMobileDrawer} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          pt: 8,
          pb: 4,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
