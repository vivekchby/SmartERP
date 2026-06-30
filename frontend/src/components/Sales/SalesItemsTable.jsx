import {
  Grid,
  TextField,
  IconButton,
  MenuItem,
} from "@mui/material";

import { Plus, Trash2 } from "lucide-react";

function SalesItemsTable({
  items,
  setItems,
  stocks,
}) {
  const addRow = () => {
    setItems([
      ...items,
      {
        stock_item_id: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    if (items.length === 1) return;

    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleChange = (
    index,
    field,
    value
  ) => {
    const updated = [...items];

    updated[index][field] = value;

    updated[index].amount =
      Number(updated[index].quantity) *
      Number(updated[index].rate);

    setItems(updated);
  };

  return (
    <>
      {items.map((item, index) => (
        <Grid
          container
          spacing={2}
          sx={{ mb: 2 }}
          key={index}
        >
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              select
              label="Stock Item"
              value={item.stock_item_id}
              onChange={(e) =>
                handleChange(
                  index,
                  "stock_item_id",
                  e.target.value
                )
              }
            >
              {stocks.map((stock) => (
                <MenuItem
                  key={stock.id}
                  value={stock.id}
                >
                  {stock.item_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleChange(
                  index,
                  "quantity",
                  Number(e.target.value)
                )
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              fullWidth
              type="number"
              label="Rate"
              value={item.rate}
              onChange={(e) =>
                handleChange(
                  index,
                  "rate",
                  Number(e.target.value)
                )
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="Amount"
              value={item.amount}
              disabled
            />
          </Grid>

          <Grid
            size={{ xs: 12, md: 2 }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              color="primary"
              onClick={addRow}
            >
              <Plus />
            </IconButton>

            <IconButton
              color="error"
              onClick={() =>
                removeRow(index)
              }
            >
              <Trash2 />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default SalesItemsTable;