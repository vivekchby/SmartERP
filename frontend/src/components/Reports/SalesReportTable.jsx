import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function SalesReportTable({ reports }) {
  return (
    <Paper elevation={3}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Voucher</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {reports.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.voucher_number}</TableCell>
              <TableCell>{sale.sale_date?.substring(0,10)}</TableCell>
              <TableCell>{sale.customer_name}</TableCell>
              <TableCell>₹{sale.total_amount}</TableCell>
            </TableRow>
          ))}

        </TableBody>

      </Table>
    </Paper>
  );
}

export default SalesReportTable;