import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import useGlobalShortcuts from "../pages/hooks/useGlobalShortcuts";
function DashboardLayout({ children }) {
  useGlobalShortcuts();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#F8FAFC",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Navbar />

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
            width: "100%",
            maxWidth: 1440,
            mx: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;