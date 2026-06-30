import { Paper, Typography } from "@mui/material";

function StatCard({ title, value, color }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        borderLeft: `6px solid ${color}`,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <Typography
        color="text.secondary"
        fontSize={15}
      >
        {title}
      </Typography>

      <Typography
        variant="h4"
        fontWeight="bold"
        mt={1}
      >
        {value}
      </Typography>
    </Paper>
  );
}

export default StatCard;