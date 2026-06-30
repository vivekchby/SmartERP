import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";

import PurchaseItemsTable from "./PurchaseItemsTable";

function PurchaseDialog({
  open,
  onClose,
  formData,
  setFormData,
  suppliers,
  stocks,
  loading,
  onSave,
}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const setItems = (items) => {
    let total = 0;

    items.forEach((item) => {
      total += Number(item.amount || 0);
    });

    setFormData({
      ...formData,
      items,
      total_amount: total,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>
        Create Purchase Voucher
      </DialogTitle>

      <DialogContent>

        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              select
              label="Supplier"
              name="supplier_id"
              value={formData.supplier_id}
              onChange={handleChange}
            >
              {suppliers.map((supplier) => (
                <MenuItem
                  key={supplier.id}
                  value={supplier.id}
                >
                  {supplier.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Voucher Number"
              name="voucher_number"
              value={formData.voucher_number}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              type="date"
              label="Purchase Date"
              name="purchase_date"
              value={formData.purchase_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

        </Grid>

        <Typography
          variant="h6"
          sx={{ mt: 3, mb: 2 }}
        >
          Purchase Items
        </Typography>

        <PurchaseItemsTable
          items={formData.items}
          setItems={setItems}
          stocks={stocks}
        />

        <Typography
          variant="h5"
          align="right"
          sx={{ mt: 3 }}
        >
          Total : ₹{formData.total_amount}
        </Typography>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Purchase"}
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default PurchaseDialog;