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
function CustomerDialog({
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
      maxWidth="sm"
    >
      <DialogTitle>
        {editMode ? "Edit Customer" : "Add Customer"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              required
              label="Customer Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              required
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              required
              multiline
              rows={3}
              label="Address"
              name="address"
              value={formData.address}
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

export default CustomerDialog;