import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 
  const { setUser } = useContext(UserContext);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!email) {
      tempErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      tempErrors.email = 'Email is not valid';
    }
    if (!password) {
      tempErrors.password = 'Password is required';
    } 

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
        // Handle login logic
        const mockUser = { // Replace with actual role fetching logic
            username: 'username',
            role: 'admin'
        };
        setUser(mockUser);
        if (mockUser.role === 'student') {
            navigate('/courses');
        } else if (mockUser.role === 'admin') {
            navigate('/dashboard');
        } else {
            alert('Unknown user role');
        }
        alert("Login successful");
    }
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
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
}

export default Login;
