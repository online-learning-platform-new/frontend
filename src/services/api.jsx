import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 Unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized, redirecting to login...");

      window.location.href = "/login";

      // remove the token from localStorage
      localStorage.removeItem("authToken");
    }

    return Promise.reject(error);
  }
);

// Authentication API
export const studentLogin = (credentials) => {
  console.log("user data: ", credentials);
  return api.post("/auth/login/student", credentials);
};
export const adminLogin = (credentials) => {
  console.log("user data: ", credentials);
  return api.post("/auth/login/admin", credentials);
};

export const register = (userData) => {
  return api.post("/auth/register", userData);
};
export const logout = () => {
  localStorage.removeItem("token");
  return Promise.resolve();
};

// Courses API
export const getCourses = () => {
    return api.get("/courses");
}

export const getCourseById = (id) => {
    const token = localStorage.getItem("authToken");
    return api.get(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
}

export const addCourse = (courseData) => {
  const token = localStorage.getItem("authToken");
  console.log("token from post add course:", token);
  return api.post("/courses", courseData, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });
};

export const updateCourse = (id, courseData) => {
  const token = localStorage.getItem("authToken");
  console.log("token from post add course:", token);
  return api.put(`/courses/${id}`, courseData, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });
};

export const deleteCourse = (id) => {
    const token = localStorage.getItem("authToken");
    api.delete(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
}

// Students API
export const getStudents = () => {
    const token = localStorage.getItem("authToken");
    return api.get("/students", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
}

export const getStudentById = (id) => {
    const token = localStorage.getItem("authToken");
    return api.get(`/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
}

export const addStudent = (studentData) => api.post("/students", studentData);

export const updateStudent = (id, studentData) =>
  api.put(`/students/${id}`, studentData);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

// Enrollments API
export const getEnrollments = () => api.get("/enrollments");
export const addEnrollment = (enrollmentData) =>
  api.post("/enrollments", enrollmentData);
export const deleteEnrollment = (id) => api.delete(`/enrollments/${id}`);

export default api;
