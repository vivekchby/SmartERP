import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Stack,
} from "@mui/material";

import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getProfile,
  updateProfile,
} from "../../services/profileApi";

function Profile() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    company_name: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      setFormData(response.profile);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);

    try {

      await updateProfile({
        name: formData.name,
        email: formData.email,
      });

      toast.success("Profile Updated");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Update Failed"
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
          My Profile
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
        >
          Update your profile details and manage account security settings from one place.
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Role"
              value={formData.role}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Company"
              value={formData.company_name}
              disabled
            />
          </Grid>

        </Grid>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: 4 }}
        >
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/change-password")}
          >
            Change Password
          </Button>
        </Stack>

      </Paper>

    </DashboardLayout>
  );
}

export default Profile;