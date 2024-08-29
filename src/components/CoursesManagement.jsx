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
  IconButton,
  TableContainer,
  TablePagination,
  Paper,
} from "@mui/material";
import axios from "axios";
// import IconButton from '@mui/material/IconButton';
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function CoursesManagement() {
  let temp_courses = [
    {
      id: 1,
      name: "Course 1",
      description: "Description of Course 1",
      instructor: "Dr. ABS",
      duration: "6 months",
    },
    {
      id: 2,
      name: "Course 2",
      description: "Description of Course 2",
      instructor: "Dr. ABS",
      duration: "6 months",
    },
    {
      id: 3,
      name: "Course 3",
      description: "Description of Course 3",
      instructor: "Dr. ABS",
      duration: "6 months",
    },
    {
      id: 4,
      name: "Course 4",
      description: "Description of Course 4",
      instructor: "Dr. ABS",
      duration: "6 months",
    },
    {
      id: 5,
      name: "Course 5",
      description: "Description of Course 5",
      instructor: "Dr. ABS",
      duration: "6 months",
    },
    {
      id: 6,
      name: "Course 6",
      description: "Description of Course 6",
      instructor: "Dr. ABS",
      duration: "3 months",
    },
  ];
  const [courses, setCourses] = useState(temp_courses);
  const [open, setOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    instructor: "",
    duration: "",
  });
  const [editingCourse, setEditingCourse] = useState(null); // State to track the course being edited
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const validate = () => {
    let tempErrors = {};

    if (!newCourse.name.trim()) tempErrors.name = "Course name is required.";
    if (!newCourse.description.trim())
      tempErrors.description = "Course description is required.";
    if (!newCourse.instructor.trim())
      tempErrors.instructor = "Instructor name is required.";
    if (!newCourse.duration.trim())
      tempErrors.duration = "Course duration is required.";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  useEffect(() => {
    // Fetch all courses from the API
    axios
      .get("http://localhost:5000/api/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    setNewCourse({ ...newCourse, [event.target.name]: event.target.value });
    console.log(newCourse);
  };

  //   const handleAddCourse = () => {

  //     // axios.post('http://localhost:5000/api/courses', newCourse)
  //     //   .then(response => {
  //     //     setCourses([...courses, response.data]);
  //     //     setOpen(false);
  //     //   })
  //     //   .catch(error => {
  //     //     console.error('Error adding course:', error);
  //     //   });
  //   };

  const handleAddOrUpdateCourse = () => {
    if (!validate()) return;

    if (editingCourse) {
      console.log(editingCourse);
      temp_courses[editingCourse.id - 1] = newCourse;
      // Update existing course
      //   axios.put(`http://localhost:5000/api/courses/${editingCourse.id}`, newCourse)
      //     .then(response => {
      //       setCourses(courses.map(course => course.id === editingCourse.id ? response.data : course));
      //       setEditingCourse(null);
      //       setOpen(false);
      //     })
      //     .catch(error => {
      //       console.error('Error updating course:', error);
      //     });
    } else {
      temp_courses.push({ id: courses.length + 1, ...newCourse });
      // Add new course
      //   axios.post('http://localhost:5000/api/courses', newCourse)
      //     .then(response => {
      //       setCourses([...courses, response.data]);
      //       setOpen(false);
      //     })
      //     .catch(error => {
      //       console.error('Error adding course:', error);
      //     });
    }
    console.log(temp_courses);
    setCourses(temp_courses);
    setOpen(false);
  };

  const handleDeleteCourse = (id) => {
    setCourses(temp_courses.filter((c) => c.id !== id));
    // axios.delete(`http://localhost:5000/api/courses/${id}`)
    //   .then(() => {
    //     setCourses(courses.filter(course => course.id !== id));
    //   })
    //   .catch(error => {
    //     console.error('Error deleting course:', error);
    //   });
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setNewCourse(course); // Pre-fill the form with the course details
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setEditingCourse(null);
    setNewCourse({ name: "", description: "", instructor: "", duration: "" });
    setOpen(false);
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Manage Courses
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Add New Course
      </Button>
      <Paper sx={{ width: "100%", overflow: "hidden", mb: 4 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table" sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Description</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Instructor</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Duration</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((course) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={course.id}>
                    <TableCell align="center">{course.name}</TableCell>
                    <TableCell align="center">{course.description}</TableCell>
                    <TableCell align="center">{course.instructor}</TableCell>
                    <TableCell align="center">{course.duration}</TableCell>
                    <TableCell align="center">
                      <Button
                        color="primary"
                        onClick={() => handleEditCourse(course)}
                      >
                        <EditRoundedIcon />
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <DeleteRoundedIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={courses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingCourse ? "Update Course" : "Add New Course"}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Course Name"
            fullWidth
            margin="normal"
            value={newCourse.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            name="description"
            label="Course Description"
            fullWidth
            margin="normal"
            value={newCourse.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            name="instructor"
            label="Course Instructor"
            fullWidth
            margin="normal"
            value={newCourse.instructor}
            onChange={handleInputChange}
            error={!!errors.instructor}
            helperText={errors.instructor}
          />
          <TextField
            name="duration"
            label="Course Duration"
            fullWidth
            margin="normal"
            value={newCourse.duration}
            onChange={handleInputChange}
            error={!!errors.duration}
            helperText={errors.duration}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddOrUpdateCourse}>
            {editingCourse ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CoursesManagement;
