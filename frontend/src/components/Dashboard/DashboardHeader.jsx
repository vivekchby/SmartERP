import {
  Paper,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

import {
  CalendarDays,
} from "lucide-react";

function DashboardHeader() {

  const user =
    localStorage.getItem("name") || "User";

  const company =
    localStorage.getItem("company_name") ||
    "SmartERP";

  const today =
    new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const hour = new Date().getHours();

  let greeting = "Welcome";

  if (hour < 12) greeting = "Good Morning";

  else if (hour < 17) greeting = "Good Afternoon";

  else greeting = "Good Evening";

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 4,
        mb: 4,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            {greeting}, {user} 👋
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
          >
            Welcome to {company}
          </Typography>

        </Box>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
        >
          <CalendarDays size={20} />

          <Typography>
            {today}
          </Typography>

        </Box>

      </Box>
    </Paper>
  );
}

export default DashboardHeader;