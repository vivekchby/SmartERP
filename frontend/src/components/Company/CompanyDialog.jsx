import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";


function CompanyDialog({
  open,
  onClose,
  formData,
  setFormData,
  onSave,
  editMode,
  loading,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editMode ? "Edit Company" : "Add Company"}</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="GST Number"
            name="gst_number"
            value={formData.gst_number}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Financial Year"
            name="financial_year"
            value={formData.financial_year}
            onChange={handleChange}
            fullWidth
            required
            placeholder="e.g. 2024-2025"
          />

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
<Button
  variant="contained"
  onClick={onSave}
  disabled={loading}
>
  {loading
    ? "Saving..."
    : editMode
    ? "Update"
    : "Save"}
</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CompanyDialog;
