import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Paper, Typography } from "@mui/material";

function MonthlySalesChart({ data }) {
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
        Monthly Sales
      </Typography>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="total"
            fill="#2563EB"
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default MonthlySalesChart;