import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Navbar() {
  const { user, handleLogout } = useContext(UserContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Online Learning Platform
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {user && (
          <>
            
            {user.role === 'admin' && (
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
            )}
            {user.role === 'student' && (
              <Button color="inherit" component={Link} to="/courses">
                Courses
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
        {!user && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
