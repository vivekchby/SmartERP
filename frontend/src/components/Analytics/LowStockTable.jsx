import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function LowStockTable({ data }) {
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
        Low Stock Items
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Item</b></TableCell>
            <TableCell><b>Stock</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={2}
                align="center"
              >
                No Low Stock
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.item_name}>
                <TableCell>
                  {item.item_name}
                </TableCell>

                <TableCell>
                  {item.current_stock}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default LowStockTable;