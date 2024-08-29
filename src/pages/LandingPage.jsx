import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Online Learning Platform
      </Typography>
      <Typography variant="h5" gutterBottom>
        Enroll in courses and learn at your own pace.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/register">
        Get Started
      </Button>
    </Container>
  );
}

export default LandingPage;
