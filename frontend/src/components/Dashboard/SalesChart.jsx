import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Paper, Typography } from "@mui/material";

function SalesChart({ data }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Monthly Sales
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default SalesChart;