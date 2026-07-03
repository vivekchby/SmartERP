import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";

import {
  Pencil,
  Trash2,
} from "lucide-react";

function LedgerTable({
  ledgers,
  onEdit,
  onDelete,
}) {
  return (
    <Paper>
      <Table>

        <TableHead>
          <TableRow>

            <TableCell>
              Ledger Name
            </TableCell>

            <TableCell>
              Group
            </TableCell>

            <TableCell>
              Opening Balance
            </TableCell>

            <TableCell>
              Balance Type
            </TableCell>

            <TableCell>
              Phone
            </TableCell>

            <TableCell align="center">
              Actions
            </TableCell>

          </TableRow>
        </TableHead>

        <TableBody>

          {ledgers.map((ledger) => (

            <TableRow key={ledger.id}>

              <TableCell>
                {ledger.ledger_name}
              </TableCell>

              <TableCell>
                {ledger.group_name}
              </TableCell>

              <TableCell>
                ₹ {ledger.opening_balance}
              </TableCell>

              <TableCell>
                {ledger.balance_type}
              </TableCell>

              <TableCell>
                {ledger.phone || "-"}
              </TableCell>

              <TableCell align="center">

                <IconButton
                  color="primary"
                  onClick={() =>
                    onEdit(ledger)
                  }
                >
                  <Pencil size={18} />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() =>
                    onDelete(ledger.id)
                  }
                >
                  <Trash2 size={18} />
                </IconButton>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>
    </Paper>
  );
}

export default LedgerTable;