import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
 YAxis,
  Tooltip,
} from "recharts";

import { Paper, Typography } from "@mui/material";

function MonthlyPurchaseChart({ data }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        height: 350,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        Monthly Purchase
      </Typography>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#22C55E"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default MonthlyPurchaseChart;