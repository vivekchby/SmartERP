import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function RecentSalesTable({ data }) {
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, borderRadius: 3 }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        Recent Sales
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Voucher</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((sale) => (
            <TableRow key={sale.voucher_number}>
              <TableCell>
                {sale.voucher_number}
              </TableCell>

              <TableCell>
                ₹{sale.total_amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default RecentSalesTable;