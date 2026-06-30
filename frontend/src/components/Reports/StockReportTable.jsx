import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function StockReportTable({ reports }) {
  return (
    <Paper elevation={3}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell><b>Item</b></TableCell>
            <TableCell><b>Code</b></TableCell>
            <TableCell><b>Category</b></TableCell>
            <TableCell><b>Stock</b></TableCell>
            <TableCell><b>Purchase</b></TableCell>
            <TableCell><b>Selling</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {reports.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
              >
                No Stock Items
              </TableCell>
            </TableRow>
          ) : (
            reports.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell>{stock.item_name}</TableCell>
                <TableCell>{stock.item_code}</TableCell>
                <TableCell>{stock.category}</TableCell>
                <TableCell>{stock.current_stock}</TableCell>
                <TableCell>₹{stock.purchase_price}</TableCell>
                <TableCell>₹{stock.selling_price}</TableCell>
              </TableRow>
            ))
          )}

        </TableBody>

      </Table>
    </Paper>
  );
}

export default StockReportTable;