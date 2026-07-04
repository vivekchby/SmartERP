import { Paper, Typography, Box } from "@mui/material";

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        borderRadius: 4,
        height: 140,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <Box>
        <Typography
          variant="body2"
          color="text.secondary"
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

        {subtitle && (
          <Typography
            variant="caption"
            color="success.main"
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: 3,
          bgcolor: `${color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
        }}
      >
        {icon}
      </Box>
    </Paper>
  );
}

export default StatCard;