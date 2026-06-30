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

function PurchaseTable({
  purchases,
  onEdit,
  onDelete,
}) {
  return (
    <Paper elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Invoice</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Supplier</b></TableCell>
            <TableCell><b>Total</b></TableCell>
            <TableCell align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {purchases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No Purchases Found
              </TableCell>
            </TableRow>
          ) : (
            purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{purchase.invoice_number}</TableCell>

                <TableCell>
                  {purchase.purchase_date?.substring(0, 10)}
                </TableCell>

                <TableCell>
                  {purchase.supplier_name}
                </TableCell>

                <TableCell>
                  ₹{purchase.total_amount}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(purchase)}
                  >
                    <Pencil size={18} />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => onDelete(purchase.id)}
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

export default PurchaseTable;