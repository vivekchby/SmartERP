import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function SalesTable({ sales, onDelete }) {
  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{ borderRadius: 3, overflow: "hidden" }}
    >
      <Table
        size="medium"
        sx={{ minWidth: 650, tableLayout: "fixed" }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, width: "18%" }}>
              Voucher
            </TableCell>
            <TableCell sx={{ fontWeight: 700, width: "18%" }}>
              Date
            </TableCell>
            <TableCell sx={{ fontWeight: 700, width: "34%" }}>
              Customer
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, textAlign: "right", width: "15%" }}
            >
              Total
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, textAlign: "center", width: "15%" }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sales.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No Sales Found
              </TableCell>
            </TableRow>
          ) : (
            sales.map((sale) => (
              <TableRow key={sale.id} hover>
                <TableCell>{sale.voucher_number}</TableCell>
                <TableCell>{sale.sale_date?.substring(0, 10)}</TableCell>
                <TableCell>{sale.customer_name}</TableCell>
                <TableCell align="right">₹{sale.total_amount}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => onDelete(sale.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SalesTable;