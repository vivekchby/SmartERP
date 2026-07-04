import {
  LayoutDashboard,
  Building2,
  Users,
  Truck,
  Boxes,
  ShoppingCart,
  Receipt,
  FileText,
  Scale,
  FolderTree,
  BookOpen,
  BarChart3,
  User,
  UserCog,
  KeyRound,
  LogOut,
} from "lucide-react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import { NavLink } from "react-router-dom";



const role = localStorage.getItem("role");
const user = JSON.parse(localStorage.getItem("user") || "{}");

const menus = [
  // MAIN
  {
    section: "MAIN",
  },
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  {
    name: "Company",
    icon: <Building2 size={20} />,
    path: "/company",
  },

  // OPERATIONS
  {
    section: "OPERATIONS",
  },
  {
    name: "Customers",
    icon: <Users size={20} />,
    path: "/customer",
  },
  {
    name: "Suppliers",
    icon: <Truck size={20} />,
    path: "/supplier",
  },
  {
    name: "Stock",
    icon: <Boxes size={20} />,
    path: "/stock",
  },
  {
    name: "Purchase",
    icon: <ShoppingCart size={20} />,
    path: "/purchase",
  },
  {
    name: "Sales",
    icon: <Receipt size={20} />,
    path: "/sales",
  },

  // ACCOUNTING
  {
    section: "ACCOUNTING",
  },
  {
    name: "Groups",
    icon: <FolderTree size={20} />,
    path: "/groups",
  },
  {
    name: "Ledgers",
    icon: <BookOpen size={20} />,
    path: "/ledgers",
  },
  {
    name: "Vouchers",
    icon: <FileText size={20} />,
    path: "/vouchers",
  },
  {
    name: "Trial Balance",
    icon: <Scale size={20} />,
    path: "/trial-balance",
  },
  {
    name: "Reports",
    icon: <BarChart3 size={20} />,
    path: "/reports",
  },

  // ACCOUNT
  {
    section: "ACCOUNT",
  },
  {
    name: "Profile",
    icon: <User size={20} />,
    path: "/profile",
  },
  {
    name: "Change Password",
    icon: <KeyRound size={20} />,
    path: "/change-password",
  },
].filter(Boolean);

const adminMenus =
  role === "Admin"
    ? [
        {
          name: "Profile",
          icon: <UserCog size={20} />,
          path: "/profile",
        },
      ]
    : [];

const accountMenus = [
  {
    name: "Profile",
    icon: <User size={20} />,
    path: "/profile",
  },
];

function Sidebar() {
  return (
    <Box
      sx={{
        width: 260,
        height: "100%",
        bgcolor: "#1E293B",
        color: "white",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ textAlign: "center" }}
        >
          SmartERP
        </Typography>
        <Typography
          variant="body2"
          color="rgba(255,255,255,0.72)"
          sx={{ textAlign: "center", mt: 1 }}
        >
          {user?.name || "Welcome"}
        </Typography>
      </Box>

      <List sx={{ flex: 1, overflowY: "auto" }}>
        {menus.map((menu) => {
          if (menu.section) {
            return (
              <Box key={menu.section} sx={{ mt: 2, mb: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    px: 3,
                    color: "#94A3B8",
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }}
                >
                  {menu.section}
                </Typography>
              </Box>
            );
          }

          return (
            <ListItemButton
              key={menu.name}
              component={NavLink}
              to={menu.path}
              sx={{
                color: "white",
                mx: 1,
                borderRadius: 2,
                mb: 1,
                "&.active": {
                  bgcolor: "#2563EB",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                {menu.icon}
              </ListItemIcon>

              <ListItemText primary={menu.name} />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ p: 2, mt: "auto" }}>
        <ListItemButton
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          sx={{
            color: "white",
            width: "100%",
            borderRadius: 2,
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <LogOut size={20} />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
}

export default Sidebar;