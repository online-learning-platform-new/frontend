import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import axios from 'axios';

function CourseDetails() {
  const temp_course = { id: 1, name: 'Course 1', description: 'Description of Course 1', instructor: "Dr. ABS", duration: "6 months" };
  const { id } = useParams(); // Get the course ID from the URL
//   const [course, setCourse] = useState(null);
  const [course, setCourse] = useState(temp_course);

  useEffect(() => {
    // Fetch course details from the API
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        setCourse(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the course details!', error);
      });
  }, [id]);

  if (!course) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        {course.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {course.description}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Instructor: {course.instructor}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Duration: {course.duration}
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 3 }}>
        Enroll in this course
      </Button>
    </Container>
  );
}

export default CourseDetails;
