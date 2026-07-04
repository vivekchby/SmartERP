import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";




import { CircleHelp } from "lucide-react";

import KeyboardShortcutDialog from "../Help/KeyboardShortcutDialog";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { Bell } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
const location = useLocation();
const [helpOpen, setHelpOpen] = useState(false);

const pageTitles = {
  "/dashboard": "Dashboard",
  "/company": "Company Management",
  "/customer": "Customer Management",
  "/supplier": "Supplier Management",
  "/stock": "Stock Management",
  "/purchase": "Purchase Management",
  "/sales": "Sales Management",
  "/reports": "Reports",
  "/users": "User Management",
  "/profile": "My Profile",
  "/change-password": "Change Password",
};

const pageTitle =
  pageTitles[location.pathname] || "SmartERP";
  const user = JSON.parse(localStorage.getItem("user"));

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
  localStorage.clear();

  navigate("/", {
    replace: true,
  });

  window.location.reload();
};

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        bgcolor: "#fff",
        color: "#1E293B",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
  {pageTitle}
</Typography>

          {location.pathname === "/dashboard" && (
  <Typography
    variant="body2"
    color="text.secondary"
  >
    Welcome to SmartERP, your all-in-one solution for efficient business management. Navigate through the dashboard to access various modules and insights.
  </Typography>
)}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Tooltip title="Notifications">
            <IconButton>
              <Bell size={20} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Keyboard Guide">

  <IconButton
    color="inherit"
    onClick={() => setHelpOpen(true)}
  >
    <CircleHelp size={22} />
  </IconButton>

</Tooltip>

          <Box
            sx={{
              textAlign: "right",
            }}
          >
            <Typography fontWeight="bold">
              {user?.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {user?.role || "Administrator"}
            </Typography>
          </Box>

          <IconButton onClick={handleMenu}>
            <Avatar
              sx={{
                bgcolor: "#2563EB",
              }}
            >
              {user?.name
                ?.charAt(0)
                ?.toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem disabled>
              {user?.email}
            </MenuItem>

            <Divider />

           <MenuItem
              onClick={() => {
                handleClose();
                navigate("/profile");
              }}
            >
              Profile
            </MenuItem>
            <Divider />

            <MenuItem
              onClick={logout}
              sx={{
                color: "red",
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      <KeyboardShortcutDialog
  open={helpOpen}
  onClose={() => setHelpOpen(false)}
/>
    </AppBar>
  );
}

export default Navbar;