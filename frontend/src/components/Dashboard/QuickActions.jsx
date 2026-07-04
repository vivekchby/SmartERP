import { Paper, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { label: "Add Customer", path: "/customer" },
    { label: "Add Supplier", path: "/supplier" },
    { label: "Create Sale", path: "/sales" },
    { label: "Create Purchase", path: "/purchase" },
    { label: "Stock Items", path: "/stock" },
    { label: "Voucher", path: "/vouchers" },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Quick Actions
      </Typography>

      <Grid container spacing={2}>
        {actions.map((action) => (
          <Grid item xs={12} sm={6} md={4} key={action.label}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate(action.path)}
              sx={{
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
              }}
            >
              {action.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default QuickActions;