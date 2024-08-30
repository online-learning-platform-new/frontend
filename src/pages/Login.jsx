import React, { useState, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { studentLogin } from "../services/api";
import { adminLogin } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [roleDialogOpen, setRoleDialogOpen] = useState(true);
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      tempErrors.email = "Email is not valid";
    }
    if (!password) {
      tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleStudentLogin = async () => {
    // Handle student login logic
    const credentials = {
      email: email,
      password: password,
    };
    console.log("credential", credentials);
    try {
      const response = await studentLogin(credentials);
      console.log("Successful student login:", response.data);
      localStorage.setItem('authToken', response.data.token);
      console.log('Token saved to localStorage:', response.data.token);
      const mockUser = {
        token: response.data.token,
        role: "student",
      };
      setUser(mockUser);
      console.log('user: ', user); //shows user as undefined -> look later
      setSnackbarMessage("Login successful as Student!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      navigate("/courses");
    } catch (error) {
      console.error("Error student login:", error);
      setSnackbarMessage("Login failed");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleAdminLogin = async () => {
    const credentials = {
      email: email,
      password: password,
    };
    console.log("credential", credentials);
    try {
      const response = await adminLogin(credentials);
      console.log("Successful admin login:", response.data);
      localStorage.setItem('authToken', response.data.token);
      console.log('Token saved to localStorage:', response.data.token);
      const mockUser = {
        token: response.data.token,
        role: "admin",
      };
      setUser(mockUser);
      console.log('user: ', user);
      setSnackbarMessage("Login successful as Admin!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error admin login:", error);
      setSnackbarMessage("Login failed");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleLogin = () => {
    if (validateForm()) {
      if (role === "student") {
        handleStudentLogin();
      } else if (role === "admin") {
        handleAdminLogin();
      } else {
        setSnackbarMessage("Unknown user role");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } else {
      setSnackbarMessage("Invalid login credentials");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setRoleDialogOpen(false);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>

      {/* Role Selection Dialog */}
      <Dialog open={roleDialogOpen} onClose={() => setRoleDialogOpen(false)}>
        <DialogTitle>Select Role</DialogTitle>
        <DialogContent>
          <Typography>Please choose your login role:</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleRoleSelect("student")} color="primary">
            Student
          </Button>
          <Button onClick={() => handleRoleSelect("admin")} color="primary">
            Admin
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;
