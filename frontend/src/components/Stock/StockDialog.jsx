import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
function StockDialog({
  open,
  onClose,
  formData,
  setFormData,
  onSave,
  editMode,
  loading,
}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {editMode ? "Edit Item" : "Add Stock Item"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Item Name"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Item Code"
              name="item_code"
              value={formData.item_code}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Purchase Price"
              name="purchase_price"
              value={formData.purchase_price}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Selling Price"
              name="selling_price"
              value={formData.selling_price}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Current Stock"
              name="current_stock"
              value={formData.current_stock}
              onChange={handleChange}
            />
          </Grid>

        </Grid>
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

export default StockDialog;