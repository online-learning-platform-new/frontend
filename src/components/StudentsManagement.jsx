import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  updateStudent,
  addStudent,
  deleteStudent,
  getStudents,
} from "../services/api";

function StudentsManagement() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  // const [confirmPassword, setConfirmPassword] = useState();

  const [editingStudent, setEditingStudent] = useState(null); // State to track the student being edited
  const [errors, setErrors] = useState({});
  // const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch all students from the API
    const token = localStorage.getItem("authToken");
    axios
      .get("http://localhost:5000/api/students", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
      .then((response) => {
        setStudents(response.data.students);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    setNewStudent({ ...newStudent, [event.target.name]: event.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePasswordStrength = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const validate = () => {
    let tempErrors = {};

    if (!newStudent.first_name.trim())
      tempErrors.first_name = "First name is required.";
    if (!newStudent.last_name.trim())
      tempErrors.last_name = "Last Name is required.";
    if (!newStudent.email) {
      tempErrors.email = "Email is required";
    } else if (!validateEmail(newStudent.email)) {
      tempErrors.email = "Email is not valid";
    }
    if (!newStudent.password) {
      tempErrors.password = "Password is required";
    } else if (!validatePasswordStrength(newStudent.password)) {
      tempErrors.password =
        "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character";
    }
    // if (!confirmPassword) {
    //   tempErrors.confirmPassword = "Confirm password is required";
    // } else if (newStudent.password !== confirmPassword) {
    //   tempErrors.confirmPassword = "Passwords do not match";
    // }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleAddOrUpdateStudent = async () => {
    console.log("new student: ", newStudent);
    if (!validate()) return;

    if (editingStudent) {
      // Update existing student
      try {
        const response = await updateStudent(editingStudent.id, newStudent);
        console.log("Student updated: ", response.data);
        setStudents(
          students.map((student) =>
            student.id === editingStudent.id ? response.data.student : student
          )
        );
        setEditingStudent(null);
        setOpen(false);
      } catch (error) {
        console.log("Error updating student: ", error);
      }
    } else {
      try {
        console.log("new student:", newStudent);
        const response = await addStudent(newStudent);
        setStudents([...students, response.data.student]);
        console.log("Student added:", response.data);
        setOpen(false);
      } catch (error) {
        console.log("Error adding student:", error);
      }
    }
    setOpen(false);
  };

  const handleDeleteStudent = async (id) => {
    // setStudents(temp_students.filter((student) => student.id !== id));
    try {
      const response = await deleteStudent(id);
      console.log("Student deleted:", response.data);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setNewStudent(student); // Pre-fill the form with the student details
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setEditingStudent(null);
    setNewStudent({ name: "", email: "" });
    setOpen(false);
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Manage Students
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add New Student
      </Button>
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
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.first_name}</TableCell>
              <TableCell>{student.last_name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  onClick={() => handleEditStudent(student)}
                >
                  <EditRoundedIcon />
                </Button>
                <Button
                  color="secondary"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  <DeleteRoundedIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingStudent ? "Update Student" : "Add New Student"}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="first_name"
            label="First Name"
            fullWidth
            margin="normal"
            value={newStudent.first_name}
            onChange={handleInputChange}
            error={!!errors.first_name}
            helperText={errors.first_name}
          />
          <TextField
            name="last_name"
            label="Last Name"
            fullWidth
            margin="normal"
            value={newStudent.last_name}
            onChange={handleInputChange}
            error={!!errors.last_name}
            helperText={errors.last_name}
          />
          <TextField
            name="email"
            label="Student Email"
            fullWidth
            margin="normal"
            value={newStudent.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
          name="password"
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={newStudent.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddOrUpdateStudent}>
            {editingStudent ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default StudentsManagement;
