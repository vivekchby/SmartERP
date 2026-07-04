import {
  Paper,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function MonthlySalesChart({
  data = [],
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        height: 430,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          Monthly Sales Overview
        </Typography>

        <FormControl size="small">
          <Select
            value="2026"
            sx={{
              minWidth: 140,
            }}
          >
            <MenuItem value="2026">
              Current Year
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="salesColor"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#2563EB"
                stopOpacity={0.45}
              />

              <stop
                offset="95%"
                stopColor="#2563EB"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="sales"
            stroke="#2563EB"
            strokeWidth={3}
            fill="url(#salesColor)"
          />

        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default MonthlySalesChart;