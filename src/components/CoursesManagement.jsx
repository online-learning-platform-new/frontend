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
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { addCourse } from "../services/api";
import { updateCourse, deleteCourse, getCourses } from "../services/api";

function CoursesManagement() {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
  });
  const [editingCourse, setEditingCourse] = useState(null);
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

    if (!newCourse.title.trim()) tempErrors.title = "Course title is required.";
    if (!newCourse.description.trim())
      tempErrors.description = "Course description is required.";
    if (!newCourse.start_date.trim())
      tempErrors.start_date = "Start date is required.";
    if (!newCourse.end_date.trim())
      tempErrors.end_date = "Course end date is required.";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  useEffect( () => {
    // Fetch all courses from the API
    // try {
    //   const response = await getCourses();
    //   setCourses(response.data.courses);
    //   console.log("courses loading: ", courses);
    // } catch (error) {
    //   console.error("Error fetching courses:", error);
    // }
    axios
      .get("http://localhost:5000/api/courses")
      .then((response) => {
        setCourses(response.data.courses);
        console.log("courses loading: ", courses);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    setNewCourse({ ...newCourse, [event.target.name]: event.target.value });
    console.log(newCourse);
  };

  const handleAddOrUpdateCourse = async () => {
    if (!validate()) return;

    if (editingCourse) {
      console.log(editingCourse);
      // Update existing course
      try {
        const response = await updateCourse(editingCourse.id, newCourse);
        console.log("Course updated:", response.data);
        setCourses(
          courses.map((course) =>
            course.id === editingCourse.id ? response.data.course : course
          )
        );
        setEditingCourse(null);
        setOpen(false);
      } catch (error) {
        console.error("Error updating course:", error);
      }
    } else {
      try {
        console.log("newCourse: ", newCourse);
        const response = await addCourse(newCourse);
        console.log("Course added:", response.data);
        setCourses([...courses, response.data.course]);
        setOpen(false);
      } catch (error) {
        console.error("Error adding course:", error);
      }
    }
    setOpen(false);
  };

  const handleDeleteCourse = async (id) => {
    try {
      const response = await deleteCourse(id);
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setNewCourse(course);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setEditingCourse(null);
    setNewCourse({ title: "", description: "", start_date: "", end_date: "" });
    setOpen(false);
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Manage Courses
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
      >
        Add New Course
      </Button>
      <Paper sx={{ width: "100%", overflow: "hidden", mb: 4 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table" sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Description
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Start Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  End Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log("courses: ", courses)}
              {Array.isArray(courses) && courses.length > 0 ? (
                courses
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((course) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={course.id}
                    >
                      <TableCell align="center">{course.title}</TableCell>
                      <TableCell align="center">{course.description}</TableCell>
                      <TableCell align="center">{course.start_date}</TableCell>
                      <TableCell align="center">{course.end_date}</TableCell>
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
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No courses available
                  </TableCell>
                </TableRow>
              )}
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
            name="title"
            label="Course Title"
            fullWidth
            margin="normal"
            value={newCourse.title}
            onChange={handleInputChange}
            error={!!errors.title}
            helperText={errors.title}
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
            name="start_date"
            label="Course Start Date"
            fullWidth
            margin="normal"
            value={newCourse.start_date}
            onChange={handleInputChange}
            error={!!errors.start_date}
            helperText={errors.start_date}
          />
          <TextField
            name="end_date"
            label="Course End Date"
            fullWidth
            margin="normal"
            value={newCourse.end_date}
            onChange={handleInputChange}
            error={!!errors.end_date}
            helperText={errors.end_date}
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
