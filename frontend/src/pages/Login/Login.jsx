import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { login } from "../../services/authApi";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await login(formData);

      localStorage.setItem("token", data.token);

localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

localStorage.setItem(
  "company_id",
  data.user.company_id
);

localStorage.setItem(
  "role",
  data.user.role
);

toast.success("Login Successful");

navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

 return (
  <Box
    sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#2563EB,#1E40AF)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Paper
      elevation={15}
      sx={{
        width: 430,
        p: 5,
        borderRadius: 4,
        bgcolor: "#ffffff",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        color="primary"
      >
        SmartERP
      </Typography>

      <Typography
        align="center"
        color="text.secondary"
        mb={4}
      >
        Enterprise Resource Planning
      </Typography>

      <Box component="form" onSubmit={handleLogin}>

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          margin="normal"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mt: 2 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.5,
            fontSize: 16,
            borderRadius: 2,
            textTransform: "none",
          }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              size={24}
              color="inherit"
            />
          ) : (
            "LOGIN"
          )}
        </Button>
        <Typography
          align="center"
          sx={{ mt: 3 }}
        >
          New Company?{" "}

          <Link
            to="/register"
            style={{
              color: "#2563EB",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Create Company
          </Link>
        </Typography>

      </Box>
    </Paper>
  </Box>
);
}

export default Login;