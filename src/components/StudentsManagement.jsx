import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

function StudentsManagement() {
  let temp_students = [
    { id: 1, firstName: "Ruvindi", lastName: "Dilsara", email: "daruvindid@gmail.com" },
    { id: 2, firstName: "Bhanuja", lastName: "Sasanka", email: "bhanu1999@gmail.com" }
  ];
  const [students, setStudents] = useState(temp_students);
  const [open, setOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', email: '' });
  const [editingStudent, setEditingStudent] = useState(null); // State to track the student being edited
  const [errors, setErrors] = useState({});


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

//   const handleAddStudent = () => {
//     axios.post('http://localhost:5000/api/students', newStudent)
//       .then(response => {
//         setStudents([...students, response.data]);
//         setOpen(false);
//       })
//       .catch(error => {
//         console.error('Error adding student:', error);
//       });
//   };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    let tempErrors = {};
  
    if (!newStudent.firstName.trim()) tempErrors.firstName = "First name is required.";
    if (!newStudent.lastName.trim()) tempErrors.lastName = "Last Name is required.";
    if (!newStudent.email) {
        tempErrors.email = 'Email is required';
      } else if (!validateEmail(newStudent.email)) {
        tempErrors.email = 'Email is not valid';
      }
    
    setErrors(tempErrors);
    
    return Object.keys(tempErrors).length === 0;
  };
  

  const handleAddOrUpdateStudent = () => {
    console.log("new student: ", newStudent);
    if (!validate()) return;

    if (editingStudent) {
        console.log("before", temp_students);
        temp_students[editingStudent.id - 1] = newStudent;
        console.log("after", temp_students);
      // Update existing student
    //   axios.put(`http://localhost:5000/api/students/${editingStudent.id}`, newStudent)
    //     .then(response => {
    //       setStudents(students.map(student => student.id === editingStudent.id ? response.data : student));
    //       setEditingStudent(null);
    //       setOpen(false);
    //     })
    //     .catch(error => {
    //       console.error('Error updating student:', error);
    //     });
    } else {
        temp_students.push({ id: students.length + 1, ...newStudent });
      // Add new student
    //   axios.post('http://localhost:5000/api/students', newStudent)
    //     .then(response => {
    //       setStudents([...students, response.data]);
    //       setOpen(false);
    //     })
    //     .catch(error => {
    //       console.error('Error adding student:', error);
    //     });
    }
    console.log(temp_students);
    setStudents(temp_students);
    setOpen(false);
  };

  const handleDeleteStudent = (id) => {
    setStudents(temp_students.filter(student => student.id !== id));
    // axios.delete(`http://localhost:5000/api/students/${id}`)
    //   .then(() => {
    //     setStudents(students.filter(student => student.id !== id));
    //   })
    //   .catch(error => {
    //     console.error('Error deleting student:', error);
    //   });
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setNewStudent(student); // Pre-fill the form with the student details
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setEditingStudent(null);
    setNewStudent({ name: '', email: '' });
    setOpen(false);
  };


  return (
    <Container>
      <Typography variant="h6" gutterBottom>Manage Students</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Student</Button>
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student => (
            <TableRow key={student.id}>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleEditStudent(student)}><EditRoundedIcon/></Button>
                <Button color="secondary" onClick={() => handleDeleteStudent(student.id)}><DeleteRoundedIcon/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{editingStudent ? 'Update Student' : 'Add New Student'}</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Student Name"
            fullWidth
            margin="normal"
            value = {newStudent.firstName}
            onChange={handleInputChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            name="name"
            label="Student Name"
            fullWidth
            margin="normal"
            value = {newStudent.lastName}
            onChange={handleInputChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            name="email"
            label="Student Email"
            fullWidth
            margin="normal"
            value = {newStudent.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddOrUpdateStudent}>{editingStudent ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default StudentsManagement;
