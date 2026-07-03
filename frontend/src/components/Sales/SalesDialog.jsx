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
import LoadingButton from "@mui/lab/LoadingButton";
import SalesItemsTable from "./SalesItemsTable";

function SalesDialog({
  open,
  onClose,
  formData,
  setFormData,
  customers,
  stocks,
  loading,
  onSave,
  editMode = false,
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
        Create Sales Voucher
      </DialogTitle>

      <DialogContent>

        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              select
              label="Customer"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
            >
              {customers.map((customer) => (
                <MenuItem
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.name}
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
              label="Sale Date"
              name="sale_date"
              value={formData.sale_date}
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
          Sale Items
        </Typography>

        <SalesItemsTable
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

        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={onSave}
        >
          {editMode ? "Update" : "Save"}
        </LoadingButton>

      </DialogActions>

    </Dialog>
  );
}

export default SalesDialog;