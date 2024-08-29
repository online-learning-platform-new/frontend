import React from 'react';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import CoursesManagement from '../components/CoursesManagement';
import StudentsManagement from '../components/StudentsManagement';
import EnrollmentsManagement from '../components/EnrollmentsManagement';

function Dashboard() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        <Tab label="Courses" />
        <Tab label="Students" />
        <Tab label="Enrollments" />
      </Tabs>

      <Box>
        {selectedTab === 0 && <CoursesManagement />}
        {selectedTab === 1 && <StudentsManagement />}
        {selectedTab === 2 && <EnrollmentsManagement />}
      </Box>
    </Container>
  );
}

export default Dashboard;
