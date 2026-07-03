import { Grid, Paper, Typography } from "@mui/material";

function Card({ title, value, color }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        height: 120,
      }}
    >
      <Typography color="text.secondary">
        {title}
      </Typography>

      <Typography
        variant="h4"
        fontWeight="bold"
        color={color}
        mt={2}
      >
        ₹ {Number(value).toLocaleString()}
      </Typography>
    </Paper>
  );
}

function TrialBalanceCards({
  debit,
  credit,
}) {
  return (
    <Grid
      container
      spacing={2}
      mb={3}
    >
      <Grid item xs={12} md={3}>
        <Card
          title="Total Debit"
          value={debit}
          color="#1976d2"
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <Card
          title="Total Credit"
          value={credit}
          color="#2e7d32"
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <Card
          title="Difference"
          value={Math.abs(debit-credit)}
          color="#ef6c00"
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <Paper
          elevation={3}
          sx={{
            p:3,
            borderRadius:3,
            height:120
          }}
        >
          <Typography>
            Status
          </Typography>

          <Typography
            variant="h5"
            color={
              debit===credit
              ?"green"
              :"red"
            }
            mt={2}
          >
            {debit===credit
            ?"Balanced"
            :"Mismatch"}
          </Typography>

        </Paper>
      </Grid>

    </Grid>
  );
}

export default TrialBalanceCards;