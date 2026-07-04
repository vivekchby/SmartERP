import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

function TopProducts({ products = [] }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        Top Selling Products
      </Typography>

      <Table size="small">

        <TableHead>

          <TableRow>

            <TableCell>
              Product
            </TableCell>

            <TableCell align="center">
              Qty Sold
            </TableCell>

            <TableCell align="right">
              Sales
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {products.length === 0 ? (

            <TableRow>

              <TableCell
                colSpan={3}
                align="center"
              >
                No Sales Available
              </TableCell>

            </TableRow>

          ) : (

            products.map((product) => (

              <TableRow
                key={product.item_name}
                hover
              >

                <TableCell>
                  {product.item_name}
                </TableCell>

                <TableCell align="center">
                  {product.total_quantity}
                </TableCell>

                <TableCell align="right">
                  ₹ {Number(product.total_sales).toLocaleString()}
                </TableCell>

              </TableRow>

            ))

          )}

        </TableBody>

      </Table>
    </Paper>
  );
}

export default TopProducts;