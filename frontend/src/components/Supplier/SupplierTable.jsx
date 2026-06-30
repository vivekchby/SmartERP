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

function SupplierTable({
  suppliers,
  onEdit,
  onDelete,
}) {
  return (
    <Paper elevation={3}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Phone</b></TableCell>
            <TableCell><b>Address</b></TableCell>
            <TableCell align="center">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {suppliers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
              >
                No Suppliers Found
              </TableCell>
            </TableRow>
          ) : (
            suppliers.map((supplier) => (
              <TableRow key={supplier.id}>

                <TableCell>{supplier.name}</TableCell>

                <TableCell>{supplier.phone}</TableCell>

                <TableCell>{supplier.address}</TableCell>

                <TableCell align="center">

                  <IconButton
                    color="primary"
                    onClick={() => onEdit(supplier)}
                  >
                    <Pencil size={18} />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => onDelete(supplier.id)}
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

export default SupplierTable;