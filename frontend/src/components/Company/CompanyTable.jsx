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

function CompanyTable({
  companies,
  onEdit,
  onDelete,
}) {
  return (
    <Paper elevation={3}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell><b>Company</b></TableCell>
            <TableCell><b>GST</b></TableCell>
            <TableCell><b>Phone</b></TableCell>
            <TableCell><b>Address</b></TableCell>
            <TableCell align="center">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
  {companies.length === 0 ? (
    <TableRow>
      <TableCell colSpan={5} align="center">
        No Companies Found
      </TableCell>
    </TableRow>
  ) : (
    companies.map((company) => (
      <TableRow key={company.id}>
        <TableCell>{company.company_name}</TableCell>
        <TableCell>{company.gst_number}</TableCell>
        <TableCell>{company.phone}</TableCell>
        <TableCell>{company.address}</TableCell>
        <TableCell align="center">
          <IconButton
            color="primary"
            onClick={() => onEdit(company)}
          >
            <Pencil size={18} />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => onDelete(company.id)}
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

export default CompanyTable;