import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
function SupplierDialog({
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
        {editMode
          ? "Edit Supplier"
          : "Add Supplier"}
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>

          <TextField
            fullWidth
            required
            label="Supplier Name"
            name="name"
            value={formData?.name || ""}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            required
            label="Phone"
            name="phone"
            value={formData?.phone || ""}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            required
            multiline
            rows={3}
            label="Address"
            name="address"
            value={formData?.address || ""}
            onChange={handleChange}
          />

        </Stack>
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

export default SupplierDialog;