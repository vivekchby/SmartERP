import {
  Paper,
  Typography,
} from "@mui/material";

function VoucherTotals({
  debit,
  credit,
}) {
  return (
    <Paper sx={{ p: 2, mt: 3 }}>

      <Typography>

        Total Debit :
        ₹ {debit}

      </Typography>

      <Typography>

        Total Credit :
        ₹ {credit}

      </Typography>

      <Typography
        color={
          debit === credit
            ? "green"
            : "red"
        }
      >
        {debit === credit
          ? "Balanced"
          : "Not Balanced"}
      </Typography>

    </Paper>
  );
}

export default VoucherTotals;