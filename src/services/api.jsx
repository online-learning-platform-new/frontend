import axios from "axios";

const API_URL = "http://localhost:5000"; // Replace with your backend URL

export const registerStudent = async (studentData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/register`,
      studentData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
