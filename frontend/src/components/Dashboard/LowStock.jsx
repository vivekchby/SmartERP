import {
  Chip,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function LowStock({ items = [] }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        Low Stock Alert
      </Typography>

      <TableContainer>
        <Table size="small">

          <TableHead>

            <TableRow>

              <TableCell>
                <b>Item</b>
              </TableCell>

              <TableCell align="center">
                <b>Qty</b>
              </TableCell>

              <TableCell align="center">
                <b>Status</b>
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {items.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={3}
                  align="center"
                >
                  No Low Stock Items
                </TableCell>

              </TableRow>

            ) : (

              items.map((item) => (

                <TableRow
                  key={item.id}
                  hover
                >

                  <TableCell>
                    {item.item_name}
                  </TableCell>

                  <TableCell align="center">
                    {item.quantity}
                  </TableCell>

                  <TableCell align="center">

                    <Chip
                      label="Low"
                      color="error"
                      size="small"
                    />

                  </TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>
  );
}

export default LowStock;