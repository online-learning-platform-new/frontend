import React from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {course.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/courses/${course.id}`}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

function Courses() {
  const courses = [
    { id: 1, name: 'Course 1', description: 'Description of Course 1' },
    { id: 2, name: 'Course 2', description: 'Description of Course 2' },
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 5 }}>
      {courses.map((course) => (
        <Grid item key={course.id} xs={12} sm={6} md={4}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Courses;
