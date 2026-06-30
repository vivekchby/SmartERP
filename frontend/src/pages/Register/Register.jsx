import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { toast } from "react-toastify";

import { register } from "../../services/authApi";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    company_name: "",
    name: "",
    email: "",
    password: "",
  });
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await register(formData);

      toast.success(response.message);

      navigate("/");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          p: { xs: 4, md: 5 },
          borderRadius: 3,
          boxShadow:
            "0 24px 80px rgba(15, 23, 42, 0.12)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          mb={1}
        >
          SmartERP
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mb={4}
        >
          Create Company Account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Company Name"
            name="company_name"
            margin="normal"
            value={formData.company_name}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Owner Name"
            name="name"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              mt: 3,
              py: 1.5,
              textTransform: "none",
            }}
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Company"}
          </Button>
        </Box>

        <Typography
          align="center"
          sx={{ mt: 3 }}
        >
          Already have an account?{" "}

          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#2563EB",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;