import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Autocomplete from '@mui/material/Autocomplete';

function EnrollmentsManagement() {
  let temp_enrollments = [
    { id: 1, student_id: 2, course_id: 3, enrollment_date: '2024-08-24' },
    { id: 2, student_id: 1, course_id: 4, enrollment_date: '2024-08-25' },
    { id: 3, student_id: 1, course_id: 1, enrollment_date: '2024-08-20' },
    { id: 4, student_id: 2, course_id: 5, enrollment_date: '2024-08-22' },
  ];
  let temp_students = [
    { id: 1, firstName: "Ruvindi", email: "daruvindid@gmail.com" },
    { id: 2, firstName: "Bhanuja", email: "bhanu1999@gmail.com" }
  ];
  let temp_courses = [
    { id: 1, name: 'Course 1', description: 'Description of Course 1', instructor: "Dr. ABS", duration: "6 months" },
    { id: 2, name: 'Course 2', description: 'Description of Course 2', instructor: "Dr. ABS", duration: "6 months" },
    { id: 3, name: 'Course 3', description: 'Description of Course 3', instructor: "Dr. ABS", duration: "6 months" },
    { id: 4, name: 'Course 4', description: 'Description of Course 4', instructor: "Dr. ABS", duration: "6 months" },
    { id: 5, name: 'Course 5', description: 'Description of Course 5', instructor: "Dr. ABS", duration: "6 months" }
  ];

  const [enrollments, setEnrollments] = useState(temp_enrollments);
  const [students, setStudents] = useState(temp_students);
  const [courses, setCourses] = useState(temp_courses);
  const [open, setOpen] = useState(false);
  const [newEnrollment, setNewEnrollment] = useState({ id: '', student_id: '', course_id: '', enrollment_date: '' });
  const [errors, setErrors] = useState({});


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

  const validate = () => {
    let tempErrors = {};
  
    if (!newEnrollment.student_id) tempErrors.student = "Student name is required.";
    if (!newEnrollment.course_id) tempErrors.course = "Course name is required.";
    setErrors(tempErrors);
    
    return Object.keys(tempErrors).length === 0;
  };
  

  const handleAddEnrollment = () => {
    if(!validate()) return;

    temp_enrollments.push({id:5, course_id: 4, student_id: 1, enrollment_date: '2024/08/29'});
    setEnrollments(temp_enrollments);
    setOpen(false);
    // axios.post('http://localhost:5000/api/enrollments', newEnrollment)
    //   .then(response => {
    //     setEnrollments([...enrollments, response.data]);
    //     setOpen(false);
    //   })
    //   .catch(error => {
    //     console.error('Error adding enrollment:', error);
    //   });
  };

  const handleDeleteEnrollment = (id) => {
    // axios.delete(`http://localhost:5000/api/enrollments/${id}`)
    //   .then(() => {
    //     setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
    //   })
    //   .catch(error => {
    //     console.error('Error deleting enrollment:', error);
    //   });
    setEnrollments(temp_enrollments.filter(enrollment => enrollment.id !== id));
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
              <TableCell>{students[enrollment.student_id-1].firstName}</TableCell>
              <TableCell>{courses[enrollment.course_id-1].name}</TableCell>
              <TableCell>
                <Button color="secondary" onClick={() => handleDeleteEnrollment(enrollment.id)}><DeleteRoundedIcon/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Enrollment</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
          <Autocomplete
                disablePortal
                options={students}
                getOptionLabel={(option) => option.firstName}  // Display the course name
                onChange={(event, newValue) => {
                setNewEnrollment({
                    ...newEnrollment,
                    student_id: newValue ? newValue.id : '', // Store the course id
                });
                }}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Student"
                    name="student_id"
                    error={!!errors.student}
                    helperText={errors.student}
                />
                )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">

            <Autocomplete
                disablePortal
                options={courses}
                getOptionLabel={(option) => option.name}  // Display the course name
                onChange={(event, newValue) => {
                setNewEnrollment({
                    ...newEnrollment,
                    course_id: newValue ? newValue.id : '', // Store the course id
                });
                }}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Course"
                    name="courseId"
                    error={!!errors.course}
                    helperText={errors.course}
                />
                )}
            />

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
