import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Box,
} from "@mui/material";

function RecentSales({ sales = [] }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        height: 430,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        mb={3}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          Recent Sales
        </Typography>

        <Button size="small">
          View All
        </Button>
      </Box>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Invoice
            </TableCell>

            <TableCell>
              Customer
            </TableCell>

            <TableCell>
              Date
            </TableCell>

            <TableCell align="right">
              Amount
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {sales.length===0?

          (

          <TableRow>

          <TableCell
          colSpan={4}
          align="center"
          >

          No Recent Sales

          </TableCell>

          </TableRow>

          ):

          (

          sales.map((sale,index)=>(

          <TableRow
          hover
          key={sale.id}
          >

          <TableCell>

          <Chip

          label={sale.invoice_number}

          color={[
          "primary",
          "success",
          "warning",
          "secondary",
          "error"
          ][index%5]}

          />

          </TableCell>

          <TableCell>

          {sale.customer_name}

          </TableCell>

          <TableCell>

          {sale.sale_date}

          </TableCell>

          <TableCell
          align="right"
          sx={{
          color:"green",
          fontWeight:"bold"
          }}
          >

          ₹ {Number(
          sale.total_amount
          ).toLocaleString()}

          </TableCell>

          </TableRow>

          ))

          )}

        </TableBody>

      </Table>

    </Paper>
  );
}

export default RecentSales;