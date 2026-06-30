import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import { changePassword } from "../../services/profileApi";

function ChangePassword() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match"
      );
    }

    setLoading(true);

    try {
      const response = await changePassword({
        currentPassword:
          formData.currentPassword,
        newPassword:
          formData.newPassword,
      });

      toast.success(response.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={1}
        >
          Change Password
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
        >
          Keep your account secure by updating your password regularly.
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="Current Password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Grid>

        </Grid>

        <Button
          sx={{ mt: 4 }}
          variant="contained"
          onClick={handleSave}
          disabled={loading}
        >
          {loading
            ? "Updating..."
            : "Update Password"}
        </Button>

      </Paper>
    </DashboardLayout>
  );
}

export default ChangePassword;