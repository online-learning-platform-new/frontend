import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

function StudentsManagement() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch all students from the API
    axios.get('http://localhost:5000/api/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    setNewStudent({ ...newStudent, [event.target.name]: event.target.value });
  };

  const handleAddStudent = () => {
    axios.post('http://localhost:5000/api/students', newStudent)
      .then(response => {
        setStudents([...students, response.data]);
        setOpen(false);
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  };

  const handleDeleteStudent = (id) => {
    axios.delete(`http://localhost:5000/api/students/${id}`)
      .then(() => {
        setStudents(students.filter(student => student.id !== id));
      })
      .catch(error => {
        console.error('Error deleting student:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>Manage Students</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Student</Button>
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                <Button color="secondary" onClick={() => handleDeleteStudent(student.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Student Name"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            name="email"
            label="Student Email"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddStudent}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default StudentsManagement;
