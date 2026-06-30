import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";

import { Pencil, Trash2 } from "lucide-react";

function StockTable({
  stocks,
  onEdit,
  onDelete,
}) {
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
            <TableCell align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {stocks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No Stock Items Found
              </TableCell>
            </TableRow>
          ) : (
            stocks.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell>{stock.item_name}</TableCell>
                <TableCell>{stock.item_code}</TableCell>
                <TableCell>{stock.category}</TableCell>
                <TableCell>{stock.current_stock}</TableCell>
                <TableCell>₹{stock.purchase_price}</TableCell>
                <TableCell>₹{stock.selling_price}</TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(stock)}
                  >
                    <Pencil size={18} />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => onDelete(stock.id)}
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}

        </TableBody>

      </Table>
    </Paper>
  );
}

export default StockTable;