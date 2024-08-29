import React, { useState, useContext, useEffect } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Container, 
    Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

function handleEnroll(id) {}

function CourseCard({ course , isEnrolled}) {
  return (
    <Card 
        sx={{ 
        maxWidth: 345, 
        m: 2, 
        boxShadow: 3, 
        borderRadius: 2, 
        transition: "transform 0.2s", 
        '&:hover': {
            transform: "scale(1.05)", 
        }
        }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {course.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.instructor}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.duration}
        </Typography>
      </CardContent>
      {!isEnrolled && (
        <CardActions>
        <Button variant="contained" color="primary" size="small" onClick={() => handleEnroll(course.id)}>
          Enroll
        </Button>
      </CardActions>
      )}
    </Card>
  );
}

function Courses() {
  const { user } = useContext(UserContext);

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
  ];
  let temp_enrolledCourses = [
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
  ];
  const [courses, setCourses] = useState(temp_courses);
  const [enrolledCourses, setEnrolledCourses] = useState(temp_enrolledCourses);

  useEffect(() => {
    // Fetch all courses that the user hasn't enrolled
    axios
      .get("http://localhost:5000/api/all_courses/{id}")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch all courses that the user has enrolled
    axios
      .get("http://localhost:5000/api/courses/{id}")
      .then((response) => {
        setEnrolledCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    
    <Container sx={{ padding: 4 }}> {/* Add padding to the container */}
      <Box sx={{ mb: 5 }}> {/* Add margin-bottom for space between sections */}
        <Typography variant="h4" component="h2" gutterBottom>
          Your Courses
        </Typography>
        <div className="your-courses">
          {enrolledCourses.length > 0 ? (
            <Grid container spacing={2}>
              {enrolledCourses.map((course) => (
                <Grid item key={course.id} xs={12} sm={6} md={4}>
                  <CourseCard course={course} isEnrolled={true} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">No courses enrolled yet.</Typography>
          )}
        </div>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          More Courses to Follow
        </Typography>
        <div className="more-courses">
          {courses.length > 0 ? (
            <Grid container spacing={2}>
              {courses.map((course) => (
                <Grid item key={course.id} xs={12} sm={6} md={4}>
                  <CourseCard course={course} isEnrolled={false} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">All courses are enrolled.</Typography>
          )}
        </div>
      </Box>
    </Container>
  );
}

export default Courses;
