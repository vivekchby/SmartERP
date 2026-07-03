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
function GroupDialog({
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
      maxWidth="sm"
    >
      <DialogTitle>
        {editMode
          ? "Edit Group"
          : "Add Group"}
      </DialogTitle>

      <DialogContent>

        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Group Name"
              name="group_name"
              value={formData.group_name}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              select
              fullWidth
              label="Group Type"
              name="group_type"
              value={formData.group_type}
              onChange={handleChange}
            >
              <MenuItem value="Asset">
                Asset
              </MenuItem>

              <MenuItem value="Liability">
                Liability
              </MenuItem>

              <MenuItem value="Income">
                Income
              </MenuItem>

              <MenuItem value="Expense">
                Expense
              </MenuItem>

            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Parent Group"
              name="parent_group"
              value={
                formData.parent_group
              }
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              name="description"
              value={
                formData.description
              }
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

export default GroupDialog;