import {
  Grid,
  TextField,
  IconButton,
} from "@mui/material";

import { Plus, Trash2 } from "lucide-react";
import { MenuItem } from "@mui/material";

function PurchaseItemsTable({
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
      updated[index].quantity *
      updated[index].rate;

    setItems(updated);
  };

  return (
    <>
      {items.map((item, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          sx={{ mb: 2 }}
        >
          <Grid size={{ xs: 3 }}>
            <TextField
  select
  fullWidth
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

          <Grid size={{ xs: 2 }}>
            <TextField
              fullWidth
              type="number"
              label="Qty"
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

          <Grid size={{ xs: 2 }}>
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

          <Grid size={{ xs: 3 }}>
            <TextField
              fullWidth
              label="Amount"
              value={item.amount}
              disabled
            />
          </Grid>

          <Grid size={{ xs: 2 }}>
            <IconButton onClick={addRow}>
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

export default PurchaseItemsTable;