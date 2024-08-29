import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

function EnrollmentsManagement() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEnrollment, setNewEnrollment] = useState({ studentId: '', courseId: '' });

  useEffect(() => {
    // Fetch all enrollments from the API
    axios.get('http://localhost:5000/api/enrollments')
      .then(response => {
        setEnrollments(response.data);
      })
      .catch(error => {
        console.error('Error fetching enrollments:', error);
      });

    // Fetch all students from the API
    axios.get('http://localhost:5000/api/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });

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
    setNewEnrollment({ ...newEnrollment, [event.target.name]: event.target.value });
  };

  const handleAddEnrollment = () => {
    axios.post('http://localhost:5000/api/enrollments', newEnrollment)
      .then(response => {
        setEnrollments([...enrollments, response.data]);
        setOpen(false);
      })
      .catch(error => {
        console.error('Error adding enrollment:', error);
      });
  };

  const handleDeleteEnrollment = (id) => {
    axios.delete(`http://localhost:5000/api/enrollments/${id}`)
      .then(() => {
        setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
      })
      .catch(error => {
        console.error('Error deleting enrollment:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>Manage Enrollments</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Enrollment</Button>
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enrollments.map((enrollment) => (
            <TableRow key={enrollment.id}>
              <TableCell>{enrollment.student.name}</TableCell>
              <TableCell>{enrollment.course.name}</TableCell>
              <TableCell>
                <Button color="secondary" onClick={() => handleDeleteEnrollment(enrollment.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Enrollment</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Student</InputLabel>
            <Select
              name="studentId"
              value={newEnrollment.studentId}
              onChange={handleInputChange}
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Course</InputLabel>
            <Select
              name="courseId"
              value={newEnrollment.courseId}
              onChange={handleInputChange}
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddEnrollment}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default EnrollmentsManagement;
