import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

function CoursesManagement() {
  let temp_courses = [
    { id: 1, name: 'Course 1', description: 'Description of Course 1', instructor: "Dr. ABS", duration: "6 months" },
    { id: 2, name: 'Course 2', description: 'Description of Course 2', instructor: "Dr. ABS", duration: "6 months" },
    { id: 3, name: 'Course 3', description: 'Description of Course 3', instructor: "Dr. ABS", duration: "6 months" },
    { id: 4, name: 'Course 4', description: 'Description of Course 4', instructor: "Dr. ABS", duration: "6 months" },
    { id: 5, name: 'Course 5', description: 'Description of Course 5', instructor: "Dr. ABS", duration: "6 months" }
  ];
  const [courses, setCourses] = useState(temp_courses);
  const [open, setOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', description: '' });

  useEffect(() => {
    // Fetch all courses from the API
    axios.get('http://localhost:5000/api/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    setNewCourse({ ...newCourse, [event.target.name]: event.target.value });
    console.log(newCourse);
  };

  const handleAddCourse = () => {
    temp_courses.push({ id: 6, name: 'Course 6', description: 'Description of Course 6', instructor: "Dr. ABS", duration: "6 months" });
    console.log(temp_courses);
    setCourses(temp_courses);
    setOpen(false);
    // axios.post('http://localhost:5000/api/courses', newCourse)
    //   .then(response => {
    //     setCourses([...courses, response.data]);
    //     setOpen(false);
    //   })
    //   .catch(error => {
    //     console.error('Error adding course:', error);
    //   });
  };

  const handleDeleteCourse = (id) => {
    setCourses(temp_courses.filter(c => c.id !== id));
    // axios.delete(`http://localhost:5000/api/courses/${id}`)
    //   .then(() => {
    //     setCourses(courses.filter(course => course.id !== id));
    //   })
    //   .catch(error => {
    //     console.error('Error deleting course:', error);
    //   });
  };

  const handleUpdateCourse = (id) => {

  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>Manage Courses</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Course</Button>
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {console.log(courses)}
          {courses.map(course => (
            <TableRow key={course.id}>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>
                <Button color="secondary" onClick={() => handleUpdateCourse(course.id)}>Update</Button>
                <Button color="secondary" onClick={() => handleDeleteCourse(course.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Course Name"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            name="description"
            label="Course Description"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            name="instructor"
            label="Course Instructor"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            name="duration"
            label="Course Duration"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCourse}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CoursesManagement;
