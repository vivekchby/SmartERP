import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function PurchaseReportTable({ reports }) {
  return (
    <Paper elevation={3}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell><b>Voucher</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Supplier</b></TableCell>
            <TableCell><b>Total</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {reports.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
              >
                No Purchase Records
              </TableCell>
            </TableRow>
          ) : (
            reports.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>
                  {purchase.voucher_number}
                </TableCell>

                <TableCell>
                  {purchase.purchase_date?.substring(0,10)}
                </TableCell>

                <TableCell>
                  {purchase.supplier_name}
                </TableCell>

                <TableCell>
                  ₹{purchase.total_amount}
                </TableCell>
              </TableRow>
            ))
          )}

        </TableBody>

      </Table>
    </Paper>
  );
}

export default PurchaseReportTable;