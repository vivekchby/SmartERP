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

function CustomerTable({
  customers,
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
            <TableCell align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No Customers Found
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id}>

                <TableCell>{customer.name}</TableCell>

                <TableCell>{customer.phone}</TableCell>

                <TableCell>{customer.address}</TableCell>

                <TableCell align="center">

                  <IconButton
                    color="primary"
                    onClick={() => onEdit(customer)}
                  >
                    <Pencil size={18} />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => onDelete(customer.id)}
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

export default CustomerTable;