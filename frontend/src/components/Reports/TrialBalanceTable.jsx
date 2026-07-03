import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function TrialBalanceTable({
  rows,
  totalDebit,
  totalCredit,
}) {
  return (
    <Paper elevation={3}>

      <Table>

        <TableHead>

          <TableRow
            sx={{
              bgcolor: "#F5F5F5",
            }}
          >
            <TableCell>#</TableCell>

            <TableCell>
              Ledger Name
            </TableCell>

            <TableCell>
              Group
            </TableCell>

            <TableCell align="right">
              Debit
            </TableCell>

            <TableCell align="right">
              Credit
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {rows.map((row,index)=>(

            <TableRow
              key={row.id}
              hover
            >

              <TableCell>
                {index+1}
              </TableCell>

              <TableCell>
                {row.ledger_name}
              </TableCell>

              <TableCell>
                {row.group_name}
              </TableCell>

              <TableCell align="right">
                ₹ {Number(row.debit).toLocaleString()}
              </TableCell>

              <TableCell align="right">
                ₹ {Number(row.credit).toLocaleString()}
              </TableCell>

            </TableRow>

          ))}

          <TableRow
            sx={{
              bgcolor:"#EEF2FF",
            }}
          >

            <TableCell
              colSpan={3}
            >
              <b>TOTAL</b>
            </TableCell>

            <TableCell align="right">
              <b>
                ₹ {Number(totalDebit).toLocaleString()}
              </b>
            </TableCell>

            <TableCell align="right">
              <b>
                ₹ {Number(totalCredit).toLocaleString()}
              </b>
            </TableCell>

          </TableRow>

        </TableBody>

      </Table>

    </Paper>
  );
}

export default TrialBalanceTable;