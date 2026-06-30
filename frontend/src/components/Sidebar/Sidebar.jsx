import {
  LayoutDashboard,
  Building2,
  Users,
  Truck,
  Boxes,
  ShoppingCart,
  Receipt,
  BarChart3,
  User,
  UserCog,
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

const mainMenus = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  ...(role === "Admin"
    ? [
        {
          name: "Company",
          icon: <Building2 size={20} />,
          path: "/company",
        },
      ]
    : []),
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
  {
    name: "Reports",
    icon: <BarChart3 size={20} />,
    path: "/reports",
  },
];

const adminMenus =
  role === "Admin"
    ? [
        {
          name: "Users",
          icon: <UserCog size={20} />,
          path: "/users",
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
        height: "100vh",
        bgcolor: "#1E293B",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ px: 3, py: 2 }}>
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

      <List sx={{ flex: 1, px: 1 }}>
        {mainMenus.map((menu) => (
          <ListItemButton
            key={menu.path}
            component={NavLink}
            to={menu.path}
            sx={{
              color: "white",
              borderRadius: 2,
              py: 1.4,
              mb: 1,
              transition: "background 0.2s ease",

              "&.active": {
                bgcolor: "#2563EB",
                color: "#fff",
              },

              "&:hover": {
                bgcolor: "#334155",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: 40,
              }}
            >
              {menu.icon}
            </ListItemIcon>

            <ListItemText
              primary={menu.name}
              primaryTypographyProps={{
                fontSize: 14,
              }}
            />
          </ListItemButton>
        ))}

        {adminMenus.length > 0 && (
          <>
            <Divider
              sx={{
                bgcolor: "rgba(255,255,255,0.16)",
                my: 2,
                mx: 1,
              }}
            />
            {adminMenus.map((menu) => (
              <ListItemButton
                key={menu.path}
                component={NavLink}
                to={menu.path}
                sx={{
                  color: "white",
                  borderRadius: 2,
                  py: 1.4,
                  mb: 1,
                  transition: "background 0.2s ease",

                  "&.active": {
                    bgcolor: "#2563EB",
                    color: "#fff",
                  },

                  "&:hover": {
                    bgcolor: "#334155",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 40,
                  }}
                >
                  {menu.icon}
                </ListItemIcon>

                <ListItemText
                  primary={menu.name}
                  primaryTypographyProps={{
                    fontSize: 14,
                  }}
                />
              </ListItemButton>
            ))}
          </>
        )}

        <Divider
          sx={{
            bgcolor: "rgba(255,255,255,0.16)",
            my: 2,
            mx: 1,
          }}
        />

        {accountMenus.map((menu) => (
          <ListItemButton
            key={menu.path}
            component={NavLink}
            to={menu.path}
            sx={{
              color: "white",
              borderRadius: 2,
              py: 1.4,
              mb: 1,
              transition: "background 0.2s ease",

              "&.active": {
                bgcolor: "#2563EB",
                color: "#fff",
              },

              "&:hover": {
                bgcolor: "#334155",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: 40,
              }}
            >
              {menu.icon}
            </ListItemIcon>

            <ListItemText
              primary={menu.name}
              primaryTypographyProps={{
                fontSize: 14,
              }}
            />
          </ListItemButton>
        ))}
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