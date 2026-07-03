import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
function LedgerDialog({
  groups,
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
      [e.target.name]:
        e.target.value,
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
        {editMode
          ? "Edit Ledger"
          : "Add Ledger"}
      </DialogTitle>

      <DialogContent>

        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Ledger Name"
              name="ledger_name"
              value={formData.ledger_name}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
  select
  fullWidth
  label="Group"
  name="group_id"
  value={formData.group_id}
  onChange={handleChange}
>
  {groups.map((group) => (
    <MenuItem
      key={group.id}
      value={group.id}
    >
      {group.group_name}
    </MenuItem>
  ))}
</TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Opening Balance"
              name="opening_balance"
              value={formData.opening_balance}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Balance Type"
              name="balance_type"
              value={formData.balance_type}
              onChange={handleChange}
            >
              <MenuItem value="Dr">
                Dr
              </MenuItem>

              <MenuItem value="Cr">
                Cr
              </MenuItem>

            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="GST Number"
              name="gst_number"
              value={formData.gst_number}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
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

export default LedgerDialog;