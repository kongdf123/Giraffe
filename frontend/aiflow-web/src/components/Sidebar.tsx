import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import RouteIcon from "@mui/icons-material/Route";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Link as RouterLink, useLocation } from "react-router-dom";

export const drawerWidth = 248;

const menuItems = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Workflows", path: "/workflows", icon: <RouteIcon /> },
  { label: "Pending Tasks", path: "/tasks", icon: <PlaylistAddCheckIcon /> },
  { label: "AI Copilot", path: "/agent", icon: <SmartToyIcon /> },
];

type SidebarProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
};

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ gap: 1.5 }}>
        <AutoAwesomeIcon color="primary" />
        <Box>
          <Typography variant="subtitle1" fontWeight={700} lineHeight={1.1}>
            AIFlow
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Workflow Center
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      <List sx={{ px: 1.5, py: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={onNavigate}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              minHeight: 44,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <SidebarContent onNavigate={onMobileClose} />
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <SidebarContent />
      </Drawer>
    </Box>
  );
}
