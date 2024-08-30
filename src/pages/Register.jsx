import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import { register } from '../services/api';
import { useNavigate } from "react-router-dom";

function Register() {
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePasswordStrength = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const validateForm = () => {
    let tempErrors = {};
    console.log('validate first_name: ', first_name);
    if (!first_name) tempErrors.first_name = 'First name is required';
    if (!last_name) tempErrors.last_name = 'Last name is required';
    if (!email) {
      tempErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      tempErrors.email = 'Email is not valid';
    }
    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (!validatePasswordStrength(password)) {
      tempErrors.password = 'Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character';
    }
    if (!confirmPassword) {
      tempErrors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        const response = await register({first_name, last_name, email, password});
        console.log('Student added:', response.data); 
        navigate("/login");
      } catch (error) {
        console.error('Error adding student:', error);
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={first_name}
        onChange={(e) => setfirst_name(e.target.value)}
        error={!!errors.first_name}
        helperText={errors.first_name}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={last_name}
        onChange={(e) => setlast_name(e.target.value)}
        error={!!errors.last_name}
        helperText={errors.last_name}
      />
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
      <TextField
        label="Confirm Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
      />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
}

export default Register;
